/* Zmienne środowiskowe */

var entry_js    = "./dev/js/components/components.js",
    output_path = "./prod/assets/js/components";

module.exports = {
    entry: entry_js,
    output: {
        path: output_path,
        filename: "components.js"
    }
}
