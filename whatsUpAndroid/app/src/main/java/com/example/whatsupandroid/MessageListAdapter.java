package com.example.whatsupandroid;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.whatsupandroid.api.Token;
import com.example.whatsupandroid.room.Message;

import java.util.List;

public class MessageListAdapter extends ArrayAdapter<Message> {
    private final int resourceLayout;
    private final Context mContext;
    private  List<Message> messages;

    public MessageListAdapter(Context context, int resource, List<Message> items) {
        super(context, resource, R.id.messageTextViewLeft, items);
        messages = items;
        this.resourceLayout = resource;
        this.mContext = context;
    }

    @Override
    public int getItemViewType(int position) {
        if (messages.get(position).getSender().equals(Token.currentUser)) {
            return 0;
        }
        else{
            return 1;
        }
    }

    @Override
    public int getViewTypeCount() {
        return 2;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View v = convertView;

        if (v == null) {
            LayoutInflater vi;
            vi = LayoutInflater.from(mContext);
            if (messages.get(position).getSender().equals(Token.currentUser)){
                v = vi.inflate(R.layout.message_item_right, null);
            } else {
                v = vi.inflate(R.layout.message_item_left, null);
            }
        }

        Message p = getItem(position);

        if (p != null) {
            TextView tt1;
            if (messages.get(position).getSender().equals(Token.currentUser))
                tt1 = (TextView) v.findViewById(R.id.messageTextViewRight);
            else
                tt1 = (TextView) v.findViewById(R.id.messageTextViewLeft);

            if (tt1 != null) {
                tt1.setText(p.getContent());
            }

        }

        return v;
    }
}
