$(document).ready(function() {
	//array to store people
	let people = [];
  
	//submit form
	$("#form").submit(function(event) {
	  event.preventDefault();
	  let name = $("#name").val();
	  let phone = $("#phone").val();
	  //check if name and phone number already exists
	  let duplicate = people.find(person => person.name === name || person.phone === phone);
	  if (!duplicate) {
		people.push({ name, phone });
		populateTable();
	  } else {
		alert("Name or phone number already exists");
	  }
	});
  
	//populate table
	function populateTable() {
	  $("#table-body").empty();
	  people.forEach(person => {
		$("#table-body").append(`
		  <tr>
			<td>${person.name}</td>
			<td>${person.phone}</td>
			<td>
			  <button class="delete-btn" data-name="${person.name}" data-phone="${person.phone}">Delete</button>
			</td>
		  </tr>
		`);
	  });
	}
  
	//search by name
	$("#search-button").click(function(){
		var searchTerm = $("#search").val().toLowerCase();
		$("#table-body tr").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(searchTerm) > -1);
		});
		$("#table-body tr").filter(function() {
		  $(this).find("td").each(function(){
			$(this).removeClass("highlight");
		  });
		  $(this).find("td:contains('"+searchTerm+"')").addClass("highlight");
		});
	});

	  
	
  
	//delete button
	$("#table-body").on("click", ".delete-btn", function() {
		var confirmDelete = confirm("Are you sure you want to delete this contact?");
		if(confirmDelete) {
			$(this).closest('tr').remove();
		}
	});
  
	//sort by name
	$("th:first-child").click(function() {
	  people.sort(function(a, b) {
		let nameA = a.name.toUpperCase();
		let nameB = b.name.toUpperCase();
		if (nameA < nameB) {
		  return -1;
		}
		if (nameA > nameB) {
		  return 1;
		}
		return 0;
	  });
	  populateTable();
	});
  });
  