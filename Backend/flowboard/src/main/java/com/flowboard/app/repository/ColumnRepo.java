package com.flowboard.app.repository;

import com.flowboard.app.entity.TaskColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ColumnRepo extends JpaRepository<TaskColumn, Integer>
{

}
