/*The following code belongs to the github account: https://github.com/mikhail-cct/CA1-In-class-Demo.git, 
/*which was adjusted and mofidied in order to create the "Timepieces" Web App */


function draw_table()//this is the code to draw the table, it goes to the link /get/html and takes the 
{                    //html form and put inside the div called results
	$("#results").empty();
	$.getJSONuncached = function (url)
	{
		return $.ajax(
		{
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#results").append(html);
				select_row();
			}
		});
	};
	$.getJSONuncached("/get/html")
};

function select_row()//here we can select the row and selecting the row for the deletion function
{
	$("#menuTable tbody tr[id]").click(function ()
	{
		$(".selected").removeClass("selected");
        $(this).addClass("selected");
        //I'm going to calculate the section and get entree for the row getting it from the id created!
        var section = $(this).prevAll("tr").children("td[colspan='6']").length - 1;
        //I'm getting it from the current row which is green color, and the getting all the previous rows
        //and afterwards getting inside the children of those rows(table data for 6 columns) and using .length-1 I can get the section number
		var watch = $(this).attr("id") - 1;//getting it from the id
		delete_row(section, watch);//I'm passing here the section and the entree called watch
	})
};

function delete_row(sec, wat)
{
	$("#delete").click(function ()
	{
		$.ajax(
		{     /* the url os linked to the app.js router.post function*/ 
			url: "/post/delete",//the deletion is happenig through the post already called that our
			type: "POST",        //app.js is managing and we send a json file that has a section number
			data:                //and an entree number called watch
			{
				section: sec,
				watch: wat
			},
			cache: false,
			success: setTimeout(draw_table, 1000)//if it is successful it will refresh the page every 1000 miliseconds
		})
	})
};

$(document).ready(function ()
{
	draw_table();
});