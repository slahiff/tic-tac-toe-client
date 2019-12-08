#!/bin/bash

curl --include --request POST "https://tic-tac-toe-wdi.herokuapp.com/games/" \
  --header "Content-type: application/json" \
  --data '{
    "game": {
      "id": "'"${ID}"'",
      "over: "'"${false}"'"
    }
  }'

echo
