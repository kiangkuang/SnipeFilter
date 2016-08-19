$(document).ready(function() {
    $('.modal-trigger').leanModal();
})

var list = ["Aerodactyl", "Alakazam", "Arcanine", "Blastoise", "Chansey", "Charizard", "Dewgong", "Dragonair", "Dragonite", "Dugtrio", "Exeggutor", "Farfetch'd", "Flareon", "Gengar", "Grimer", "Gyarados", "Haunter", "Hitmonchan", "Hitmonlee", "Jolteon", "Kangaskhan", "Lapras", "Lickitung", "Magneton", "Marowak", "Mr. Mime", "Muk", "Nidoking", "Nidoqueen", "Ninetales", "Porygon", "Raichu", "Rapidash", "Slowbro", "Snorlax", "Vaporeon", "Venusaur", "Wigglytuff"];

list.forEach(function(item) {
    $("#filters").append(`
        <p style="margin: 0;">
            <input type="checkbox" name="filter" id="` + item + `" value="` + item + `" checked="checked"/>
            <label for="` + item + `">` + item + `</label>
        </p>
    `);
});

var interval = setInterval(getJson, 1000);

function getJson() {
    $.getJSON("https://crossorigin.me/http://pokesnipers.com/api/v1/pokemon.json", function(json) {
        $(".collection").empty();
        json.results.forEach(parse);
        if ($(".collection li").length == 0) {
            $(".collection").append(`
                <li class="collection-item avatar valign-wrapper">
                    <span class="title valign">Waiting for Pokemon to spawn...</span>
                </li>
            `);
        }
    });
}

function parse(pokemon) {
    var activeFilter = [];
    $("input:checkbox[name=filter]:checked").each(function() {
        activeFilter.push($(this).val());
    });

    var coords = pokemon.coords.split(",");
    var until = new Date(pokemon.until);
    if (coords[0] > $("#min_lat").val() &&
        coords[0] < $("#max_lat").val() &&
        coords[1] > $("#min_long").val() &&
        coords[1] < $("#max_long").val() &&
        $.inArray(pokemon.name, activeFilter) !== -1) {
        $(".collection").append(`
            <li class="collection-item avatar" style="padding-left:96px;">
                <img src="` + pokemon.icon + `" alt="` + pokemon.name + `" class="circle" style="height: 66px;width:auto;">
                <span class="title"><strong>` + pokemon.name + `</strong></span>
                <p>
                    <i class="material-icons tiny">place</i> <a href="https://maps.google.com/?q=` + pokemon.coords + ` (` + pokemon.name + `)" target="_blank">` + pokemon.coords + `</a>
                    <br><i class="material-icons tiny">timer</i> ` + 
                    ~~((until - new Date()) / 60000) + `m ` + 
                    ~~(((until - new Date()) % 60000) / 1000) + `s
                </p>
            </li>
        `);
    }
}

var selected = true
$("#select-all").click(function() {
    selected = !selected;
    $(':checkbox').each(function() {
        this.checked = selected;
    });
    if (selected) {
        $("#select-all").text("Deselect All");
    } else {
        $("#select-all").text("Select All");
    }
});
