package com.example.whatsupandroid.models;

public class SetFirebaseTokenRequest {
    String firebaseToken;

    public String getFirebaseToken() {
        return firebaseToken;
    }

    public void setFirebaseToken(String firebaseToken) {
        this.firebaseToken = firebaseToken;
    }

    public SetFirebaseTokenRequest(String firebaseToken) {
        this.firebaseToken = firebaseToken;
    }
}
