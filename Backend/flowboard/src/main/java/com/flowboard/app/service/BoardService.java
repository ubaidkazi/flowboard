package com.flowboard.app.service;

import com.flowboard.app.dto.response.BoardCardDataResponse;
import com.flowboard.app.dto.response.BoardDataResponseDTO;
import com.flowboard.app.dto.response.BoardResponseDTO;
import com.flowboard.app.entity.*;
import com.flowboard.app.mapper.BoardDataMapper;
import com.flowboard.app.mapper.BoardResponseMapper;
import com.flowboard.app.repository.*;
import com.flowboard.app.util.JsonUtils;
import com.flowboard.app.websocket.projectevents.BoardAddedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

import static com.flowboard.app.enums.EventType.*;

@Service
public class BoardService {

    @Autowired
    ProjectRepo projectRepo;
    @Autowired
    BoardRepo boardRepo;

    @Autowired
    TaskColumnRepo columnRepo;

    @Autowired
    CardRepo cardRepo;

    @Autowired
    UserService userService;

    @Autowired
    OutboxRepository outboxRepository;

    @Autowired
    private BoardDataMapper boardDataMapper;

    @Autowired
    private BoardResponseMapper boardResponseMapper;


    public ResponseEntity<Board> createBoard(Board board, Long projectId) {
        if (board.getColumns() != null) {
            for (TaskColumn column : board.getColumns()) {
                column.setBoard(board); // establish parent for column

                if (column.getCards() != null) {
                    for (Card card : column.getCards()) {
                        card.setColumn(column); // establish parent for card
                    }
                }
            }
        }
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        board.setProject(project);

        BoardAddedEvent event = new BoardAddedEvent(
                BOARD_CREATED,
                board.getName(),
                board.getDescription(),
                userService.getCurrentUser().getId(),
                Instant.now()
        );

        String payload = JsonUtils.toJson(event);

        OutboxEvent outboxEvent = new OutboxEvent();
        outboxEvent.setEventType("BOARD_CREATED");
        outboxEvent.setTopic("/topic/projects/");
        outboxEvent.setDestinatonId(projectId.intValue());
        outboxEvent.setPayload(payload);
        outboxEvent.setCreatedAt(Instant.now());


        outboxRepository.save(outboxEvent);

        return new ResponseEntity<>(boardRepo.save(board), HttpStatus.OK);
    }

    public ResponseEntity<List<Board>> getBoardsByUserId(int userId) {
        List<Board> boards = boardRepo.findByUserId(userId);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }


    //old method, not used currently
    public ResponseEntity<List<BoardDataResponseDTO>> getBoardsByProjectId(Long projectId) {

        List<BoardDataResponseDTO> boards = boardRepo.findByProjectId(projectId)
                .stream()
                .map(boardDataMapper::toDTO)
                .toList();

        return ResponseEntity.ok(boards);
    }


    public ResponseEntity<List<BoardCardDataResponse>> getBoardDataByProjectId(Long projectId) {
        List<BoardCardDataResponse> data = boardRepo.getBoardCardData(projectId.intValue());
        return new ResponseEntity<>(data, HttpStatus.OK);
    }


    public ResponseEntity<Board> deleteBoard(int id) {
        try {
            Board board = boardRepo.findById(id).get();
            boardRepo.deleteById(id);
            return new ResponseEntity<>(board, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((HttpHeaders) null, HttpStatus.NO_CONTENT);
        }
    }

    public BoardResponseDTO getBoardById(int id) {
        try {
            Board board = boardRepo.findById(id).get();
            Board sortedBoard = sortBoardData(board);
            return boardResponseMapper.toDTO(sortedBoard);
        } catch (Exception e) {
            return null;
        }
    }

    public Board sortBoardData(Board board)
    {
        List<TaskColumn> columns = board.getColumns();

        List<TaskColumn> sortedColumns = columns.stream()
                .sorted(Comparator.comparingInt(TaskColumn::getPosition))
                .toList();

        for(TaskColumn column:sortedColumns)
        {
            List<Card> sortedCards = column.getCards().stream()
                    .sorted(Comparator.comparingInt(Card::getPosition))
                    .toList();

            column.setCards(sortedCards);

        }

        board.setColumns(sortedColumns);
        return board;
    }


    public void sortBoardDataReturnVoid(Board board) {

        // Sort columns IN PLACE
        board.getColumns()
                .sort(Comparator.comparingInt(TaskColumn::getPosition));

        for (TaskColumn column : board.getColumns()) {

            // Sort cards IN PLACE
            column.getCards()
                    .sort(Comparator.comparingInt(Card::getPosition));
        }
    }

    public ResponseEntity<String> updateBoardName(int boardId, String newName)
    {
        Board board = boardRepo.findById(boardId).orElseThrow(()->new RuntimeException("board does not exist"));

        board.setName(newName);
        boardRepo.save(board);

        String updatedName = boardRepo.findById(boardId).get().getName();

        return ResponseEntity.status(HttpStatus.OK).body(updatedName);
    }


//    @Transactional
//    public ResponseEntity<String> updateBoardPositions(UpdateBoardRequest request) {
//        Board oldBoard = boardRepo.findById(request.getBoardId())
//                .orElseThrow(() -> new RuntimeException("Board not found with id: " + request.getBoardId()));
//
//        Map<Long, TaskColumn> columnMap = new HashMap<>();
//
//        if (request.getUpdatedColumns() != null) {
//            List<TaskColumn> updatedColumns = new ArrayList<>();
//            for (UpdateColumnRequest newColumn : request.getUpdatedColumns()) {
//                TaskColumn column = columnRepo.findById(newColumn.getId())
//                        .orElseThrow(() -> new RuntimeException("Column not found: " + newColumn.getId()));
//                column.setPosition(newColumn.getPosition());
//                columnMap.put(column.getId(), column);
//                updatedColumns.add(column);
//            }
//            columnRepo.saveAll(updatedColumns);
//        }
//
//        if (request.getUpdatedCards() != null) {
//            List<Card> updatedCards = new ArrayList<>();
//            for (UpdateCardRequest newCard : request.getUpdatedCards()) {
//                Card card = cardRepo.findById(newCard.getId())
//                        .orElseThrow(() -> new RuntimeException("Card not found: " + newCard.getId()));
//
//
//                Long oldColumnId = card.getColumn().getId();
//                Integer oldPosition = card.getPosition();
//
//
//                TaskColumn parentColumn = columnMap.get(newCard.getColumnId());
//                if (parentColumn == null) {
//                    parentColumn = columnRepo.findById(newCard.getColumnId())
//                            .orElseThrow(() -> new RuntimeException("Column not found: " + newCard.getColumnId()));
//                }
//
//
//
//
//                card.setColumn(parentColumn);
//                card.setPosition(newCard.getPosition());
//                updatedCards.add(card);
//            }
//
//            cardRepo.saveAll(updatedCards);
//        }
//        boolean columnChanged = request.getNewColumn() == (request.getOldColumn());
//        int movedCardId = request.getCardMoved();
//        Card movedCard = cardRepo.findById(movedCardId).get();
//        Integer oldPosition = movedCard.getPosition();
//
//        boolean positionChanged = oldPosition == request.getNewPosition();
//
//        if (columnChanged || positionChanged) {
//            CardMovedEvent event = new CardMovedEvent(
//                    "CARD_MOVED",
//                    movedCard.getId(),
//                    request.getBoardId(),
//                    oldPosition,
//                    movedCard.getPosition(),
//                    userService.getCurrentUser().getId(),
//                    Instant.now()
//            );
//
//            boardEventPublisher.publishCardMoved(event);
//        }
//
//
//        return new ResponseEntity<>("okay", HttpStatus.OK);
//    }



//    public ResponseEntity<List<BoardMemberDataResponse>> getBoardMembers()
//    {
//
//        return
//    }











}

