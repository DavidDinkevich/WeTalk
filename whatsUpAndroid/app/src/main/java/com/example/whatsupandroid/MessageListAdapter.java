package com.example.whatsupandroid;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;

public class MessageListAdapter extends ArrayAdapter<Message> {
    private final int resourceLayout;
    private final Context mContext;

    public MessageListAdapter(Context context, int resource, List<Message> items) {
        super(context, resource, R.id.messageTextView, items);
        this.resourceLayout = resource;
        this.mContext = context;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View v = convertView;

        if (v == null) {
            LayoutInflater vi;
            vi = LayoutInflater.from(mContext);
            v = vi.inflate(resourceLayout, null);
        }

        Message p = getItem(position);

        if (p != null) {
            TextView tt1 = (TextView) v.findViewById(R.id.messageTextView);

            if (tt1 != null) {
                tt1.setText(p.getContent());
            }

        }

        return v;
    }


}
