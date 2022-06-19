package com.example.whatsupandroid;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.whatsupandroid.room.Contact;

import java.util.List;

public class ContactListAdapter extends ArrayAdapter<Contact> {
    private final int resourceLayout;
    private final Context mContext;

    public ContactListAdapter(Context context, int resource, List<Contact> items) {
        super(context, resource, R.id.user_name, items);
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

        Contact p = getItem(position);

        if (p != null) {
            TextView tt1 = (TextView) v.findViewById(R.id.user_name);
            TextView tt2 = (TextView) v.findViewById(R.id.last_massage);

            if (tt1 != null) {
                tt1.setText(p.getId());
            }

            if (tt2 != null) {
                tt2.setText(p.getLast());
            }
        }

        return v;
    }


}
