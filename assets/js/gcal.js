var url="http://www.google.com/calendar/feeds/openctf.com_a1ttrusmgnv8cf830asi62h02k@group.calendar.google.com/public/full?alt=json-in-script&max-results=50&singleevents=false&pastevents=true&sortorder=descending&orderby=starttime&callback=cal";

$(document).ready(function()
{
    $('body').append('<scri'+'pt src="'+url+'"></scr'+'ipt>');
});

function addEvents(e, div)
{
    for(i in e)
    {
        var markup = "<h3>&raquo; <a href='"+e[i]['link']+"'>"+e[i]['title']+"</a> <small>"+e[i]['startTime']+"</small></h3>";
        div.append(markup);
    }
}

function cal(data) 
{ 
    var upcoming = [];
    var past = [];
    $.each(data.feed.entry, function(i, entry){
        e = {};
        e['title'] = entry.title.$t;
        e['startTime'] = new Date(entry.gd$when[0].startTime);
        e['endTime'] = new Date(entry.gd$when[0].endTime);
        e['where'] = entry.gd$where[0].valueString;
        e['content'] = entry.content.$t;
        e['link'] = entry.link[0].href;
        if(e['startTime'] > new Date())
        { upcoming.push(e);}
        else
        { past.push(e);}
    });
    if(upcoming.length > 0){
        upcoming.reverse();
        addEvents(upcoming, $('#gcal-upcoming'));
    } else { $('#gcal-upcoming').text('None');}
    if (past.length > 0){
        addEvents(past, $('#gcal-past'));
    } else { $('#gcal-past').html('<h3><small>None</small></h3>'); }
}
