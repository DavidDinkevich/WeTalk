package com.example.whatsupandroid;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface MessageDao {

    @Query("SELECT * FROM message")
    List<Message> index();

    @Query("SELECT * FROM message WHERE id = :id")
    Contact get(String id);

    @Query("SELECT * FROM message WHERE sender = :contactID OR recipient = :contactID")
    List<Message> getMessagesWithContact(String contactID);

    @Insert
    void insert(Message... c);
    @Update
    void update(Message... c);
    @Delete
    void delete(Message... c);

    @Query("DELETE FROM message")
    public void nukeTable();
}
