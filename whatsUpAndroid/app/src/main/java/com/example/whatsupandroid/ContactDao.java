package com.example.whatsupandroid;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface ContactDao {

    @Query("SELECT * FROM contact")
    List<Contact> index();

    @Query("SELECT * FROM contact WHERE id = :id")
    Contact get(String id);

    @Insert
    void insert(Contact... c);
    @Update
    void update(Contact... c);
    @Delete
    void delete(Contact... c);

    @Query("DELETE FROM contact")
    public void nukeTable();

}
