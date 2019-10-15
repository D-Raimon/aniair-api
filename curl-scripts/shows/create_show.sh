#!/bin/bash

# API="http://localhost:4741" URL_PATH="/shows" NAME="Boku no Hero Academia" AIRDAY="Saturday" NUMOFEPS="25" URL="https://cdn.myanimelist.net/images/anime/1315/102961.jpg" SHORT="Fourth season of Boku no Hero Academia." LONG="Will add later." TRAILER="https://www.youtube.com/watch?v=PRjWwLV_Xuo"



curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "show": {
      "name": "'"${NAME}"'",
      "airDay": "'"${AIRDAY}"'",
      "numOfEps": "'"${NUMOFEPS}"'",
      "url": "'"${URL}"'",
      "shortDescription": "'"${SHORT}"'",
      "longDescription": "'"${LONG}"'",
      "trailer": "'"${TRAILER}"'"
    }
  }'

echo
