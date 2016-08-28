$(document).ready(function() {
    $('.modal-trigger').leanModal();
})

var list = ["Aerodactyl", "Alakazam", "Arcanine", "Beedrill", "Blastoise", "Butterfree", "Chansey", "Charizard", "Charmeleon", "Clefable", "Cloyster", "Dewgong", "Dodrio", "Dragonair", "Dragonite", "Dratini", "Dugtrio", "Electabuzz", "Exeggutor", "Farfetch'd", "Fearow", "Flareon", "Gengar", "Gloom", "Golduck", "Golem", "Grimer", "Gyarados", "Haunter", "Hitmonchan", "Hitmonlee", "Hypno", "Ivysaur", "Jolteon", "Kabuto", "Kabutops", "Kadabra", "Kangaskhan", "Kingler", "Lapras", "Lickitung", "Machamp", "Magmar", "Magneton", "Marowak", "Mr. Mime", "Muk", "Nidoking", "Nidoqueen", "Nidorina", "Nidorino", "Ninetales", "Omanyte", "Omastar", "Onix", "Parasect", "Pidgeot", "Pinsir", "Poliwhirl", "Poliwrath", "Porygon", "Primeape", "Raichu", "Rapidash", "Rhydon", "Scyther", "Seadra", "Seaking", "Slowbro", "Snorlax", "Starmie", "Tangela", "Tauros", "Tentacruel", "Vaporeon", "Venomoth", "Venusaur", "Victreebel", "Vileplume", "Wartortle", "Weepinbell", "Weezing", "Wigglytuff"];

for (var col = 0; col < 3; col++) {
    for (var i = col * (list.length / 3); i < (col + 1) * (list.length / 3); i++) {
        i = Math.ceil(i);
        $($("#filters .col")[col]).append(`
            <p style="margin: 0;">
                <input type="checkbox" name="filter" id="` + list[i] + `" value="` + list[i] + `" checked="checked"/>
                <label for="` + list[i] + `">` + list[i] + `</label>
            </p>
        `);
    }
}

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
