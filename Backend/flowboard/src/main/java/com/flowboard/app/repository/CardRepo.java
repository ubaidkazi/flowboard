package com.flowboard.app.repository;

import com.flowboard.app.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CardRepo extends JpaRepository<Card, Integer>
{

    @Query("SELECT COALESCE(Max(c.position), -1) FROM Card c WHERE c.column.id = :columnId ")
    int findMaxPositionByListId(@Param("columnId")   int columnId);


}