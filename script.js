var list = [
    "bulbasaur",
    "ivysaur",
    "venusaur",
    "charmander",
    "charmeleon",
    "charizard",
    "squirtle",
    "wartortle",
    "blastoise",
    "caterpie",
    "metapod",
    "butterfree",
    "weedle",
    "kakuna",
    "beedrill",
    "pidgey",
    "pidgeotto",
    "pidgeot",
    "rattata",
    "raticate",
    "spearow",
    "fearow",
    "ekans",
    "arbok",
    "pikachu",
    "raichu",
    "sandshrew",
    "sandslash",
    "nidoranFemale",
    "nidorina",
    "nidoqueen",
    "nidoranMale",
    "nidorino",
    "nidoking",
    "clefairy",
    "clefable",
    "vulpix",
    "ninetales",
    "jigglypuff",
    "wigglytuff",
    "zubat",
    "golbat",
    "oddish",
    "gloom",
    "vileplume",
    "paras",
    "parasect",
    "venonat",
    "venomoth",
    "diglett",
    "dugtrio",
    "meowth",
    "persian",
    "psyduck",
    "golduck",
    "mankey",
    "primeape",
    "growlithe",
    "arcanine",
    "poliwag",
    "poliwhirl",
    "poliwrath",
    "abra",
    "kadabra",
    "alakazam",
    "machop",
    "machoke",
    "machamp",
    "bellsprout",
    "weepinbell",
    "victreebel",
    "tentacool",
    "tentacruel",
    "geodude",
    "graveler",
    "golem",
    "ponyta",
    "rapidash",
    "slowpoke",
    "slowbro",
    "magnemite",
    "magneton",
    "farfetchd",
    "doduo",
    "dodrio",
    "seel",
    "dewgong",
    "grimer",
    "muk",
    "shellder",
    "cloyster",
    "gastly",
    "haunter",
    "gengar",
    "onix",
    "drowzee",
    "hypno",
    "krabby",
    "kingler",
    "voltorb",
    "electrode",
    "exeggcute",
    "exeggutor",
    "cubone",
    "marowak",
    "hitmonlee",
    "hitmonchan",
    "lickitung",
    "koffing",
    "weezing",
    "rhyhorn",
    "rhydon",
    "chansey",
    "tangela",
    "kangaskhan",
    "horsea",
    "seadra",
    "goldeen",
    "seaking",
    "staryu",
    "starmie",
    "mr. mime",
    "scyther",
    "jynx",
    "electabuzz",
    "magmar",
    "pinsir",
    "tauros",
    "magikarp",
    "gyarados",
    "lapras",
    "ditto",
    "eevee",
    "vaporeon",
    "jolteon",
    "flareon",
    "porygon",
    "omanyte",
    "omastar",
    "kabuto",
    "kabutops",
    "aerodactyl",
    "snorlax",
    "articuno",
    "zapdos",
    "moltres",
    "dratini",
    "dragonair",
    "dragonite",
    "mewtwo",
    "mew"
];

var defaultFilters = [
    "venusaur", "charizard", "blastoise",
    "beedrill", "raichu", "sandslash",
    "nidoking", "nidoqueen", "clefable",
    "ninetales", "golbat", "vileplume",
    "golduck", "primeape", "arcanine",
    "poliwrath", "alakazam", "machamp",
    "golem", "rapidash", "slowbro",
    "farfetchd", "muk", "cloyster",
    "gengar", "exeggutor", "marowak",
    "hitmonchan", "lickitung", "rhydon",
    "chansey", "kangaskhan", "starmie",
    "mr. mime", "scyther", "magmar",
    "electabuzz", "jynx", "gyarados",
    "lapras", "ditto", "vaporeon",
    "jolteon", "flareon", "porygon",
    "kabutops", "aerodactyl", "snorlax",
    "articuno", "zapdos", "moltres",
    "dragonair", "dragonite", "mewtwo",
    "mew"
];

list.forEach(function(item) {
    var selected = "";
    if ($.inArray(item, defaultFilters) !== -1) {
        selected = "checked=true";
    };
    $("#filters").append(`
        <p style="margin: 0;">
            <input type="checkbox" name="filter" id="` + item + `" value="` + item + `" ` + selected + `"/>
            <label for="` + item + `">` + item + `</label>
        </p>
    `);
});

getJson();
var interval = setInterval(getJson, 1000);

function getJson() {
    $.getJSON("https://crossorigin.me/http://pokesnipers.com/api/v1/pokemon.json", function(json) {
        $(".collection").empty();
        json.results.forEach(parse);
        if ($(".collection li").length == 0) {
            $(".collection").append(`
                <li class="collection-item avatar valign-wrapper">
                    <span class="title valign">No Pokemon found!</span>
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
    if (coords[0] > 1.274269 &&
        coords[0] < 1.459611 &&
        coords[1] > 103.643668 &&
        coords[1] < 104.012396 &&
        $.inArray(pokemon.name.toLowerCase(), activeFilter) !== -1) {
        $(".collection").append(`
            <li class="collection-item avatar">
                <img src="` + pokemon.icon + `" alt="` + pokemon.name + `" class="circle">
                <span class="title">` + pokemon.name + `</span>
                <p>
                    <a href="https://maps.google.com/?q=` + pokemon.coords + ` (` + pokemon.name + `)" target="_blank">` + pokemon.coords + `</a>
                    <br>` +
                    ~~((until - new Date()) / 60000) + ` mins ` +
                    ~~(((until - new Date()) % 60000) / 1000) + ` s
                </p>
            </li>
        `);
    }
}

var selectAll = false
$("#select-all").click(function() {
    selectAll = !selectAll;
    $(':checkbox').each(function() {
        this.checked = selectAll;                        
    });
});