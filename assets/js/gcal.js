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
    var uphead = $("<h2>Upcoming</h2>");
    var updiv  = $("<div id='gcal-upcoming'></div>");
    var pahead = $("<h2>Past</h2>");
    var padiv = $("<div id='gcal-past'></div>");

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
        addEvents(upcoming, updiv);
    } else { updiv.html('<h3><small>None</small></h3>');}
    if (past.length > 0){
        addEvents(past, padiv);
    } else { padiv.html('<h3><small>None</small></h3>');}
    $('#events-container').empty();
    uphead.append(updiv);
    pahead.append(padiv);
    $('#events-container').append(uphead);
    $('#events-container').append(pahead);
}
