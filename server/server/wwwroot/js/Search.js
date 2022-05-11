$(function () {
    $('form').submit( function (e) {
        e.preventDefault();

        const q = $('#search').val();
        //$('tbody').load('/Ratings/Search?query=' + q);

        fetch('/Ratings/Search?query=' + q)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let str = '<tr><td>' + data[0].ratingsCount + '</td><td>' + data[0].name + '</td><td>' + data[0].message + '</td><td>' + data[0].time + '</td></tr>';
                $('tbody').html(str);

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