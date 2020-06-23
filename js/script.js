document.addEventListener('DOMContentLoaded', function() {

	// SIDEBAR NAVIGATION
	const elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems);
	loadNav();
	
	// Running when page load
	let page = window.location.hash.substr(1);
	if(page === '') page = 'home';
	loadPage(page);

	function loadNav()
	{
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				if(this.status != 200) return;

				// Muat daftar tautan menu
				document.querySelectorAll(".sidenav, .topnav")
				.forEach(function(elm){
					elm.innerHTML = xhttp.responseText;
				});

				// Daftarkan event listener untuk setiap tautan menu
				document.querySelectorAll('.sidenav a, .topnav a, .brand-logo')
				.forEach(function(elm) {
					elm.addEventListener('click', function(event) {
						// Tutup sidenav
						const sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();
						
						// Muat konten halaman yang dipanggil 
						let page = event.target.getAttribute('href').substr(1);
						if(page === '') page = 'home';
						loadPage(page);
					});
				});
			}
		};
		xhttp.open("GET", 'pages/nav.html', true);
		xhttp.send();
	}

	function loadPage(page)
	{
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4){
				const content = document.querySelector(".body-content");
				if(this.status == 200) {
					content.innerHTML = xhttp.responseText;
					menuBox();
					showTopButton();

					// show tooltip
					const tooltip = document.querySelectorAll('.tooltipped');
					M.Tooltip.init(tooltip, { margin: -10 });

				} else if(this.status == 404) {
					content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
				} else {
					content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
				}
			}
		};
		
		xhttp.open("GET", `pages/${page}/${page}.html`, true);
		xhttp.send();
	}
	
	function menuBox() {
		const box = document.querySelectorAll(".box")
		if (box) {
			box.forEach((elm) => {
				elm.addEventListener('click', function (e) {
					let page = e.target.getAttribute('link').substr(1);
					if(page === '') page = 'home';
					loadPage(page);
					scrollTop();
				})
			})
		}
	}

});


function showTopButton() {
	const scrollTopButton = document.querySelector(".scrollTop");
	window.addEventListener("scroll", () => {
		if (window.pageYOffset > 200) {
			scrollTopButton.classList.add("active")
		} else {
			scrollTopButton.classList.remove("active")
		}
	})
	scrollTopButton.addEventListener("click", function () {
		scrollTop()
	});
}

function scrollTop() {
	window.scroll({
		top: 0, 
		left: 0, 
		behavior: 'smooth'
	});
}