$(function () {
    $('form').submit( function (e) {
        e.preventDefault();

        const q = $('#search').val();
        //$('tbody').load('/Ratings/Search?query=' + q);

        fetch('/Ratings/Search?query=' + q)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let temp = data[0].time.split('T');
                let time = (temp[1].split('.'))[0];
                let date = temp[0].split('-');
                let timeDate = date[0].concat("/", date[1], "/", date[2], " ", time);
                let str = '<tr><td>' + data[0].ratingsCount + '</td><td>' + data[0].name + '</td><td>' + data[0].message + '</td><td>' + timeDate + '</td></tr>';
                $('tbody').html(str);
                $('#backList').html("told you shachar :>)")

            })
//        const data = await response.json();
        

        /*
        e.preventDefault();

        const q = $('#search').val();
        //$('tbody').load('/Ratings/Search?query=' + q);

        const response = await fetch('/Ratings/Search?query=' + q);
        const data = await response.json();
        console.log(data)
        

        $('tbody').html('<tr><td>' + data[0].title + '</td></tr>');*/
    })
});