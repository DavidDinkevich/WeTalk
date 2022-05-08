// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

/*


$(function() {
    $('form').submit(async e => {
        e.preventDefault();
        const q = $('#search').val();

        var r = await fetch('/Ratings/Search?query=' + q);
        var d = await r.json();

        const template = $('#template').html();
        let results = '';
        for (var item in d) {
            let row = template;
            for (var key in d[item]) {
                row = row.replaceAll('{' + key + '}', d[item][key]);
                row = row.replaceAll('%7B' + key + '%7D', d[item][key]);
            }
            results += row;
        }
        $('tbody').html(results);
    });

} );

 * */