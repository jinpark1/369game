# 369 game
## How to Install
1. To install the packages run yarn install.
2. To launch the app run yarn start.

## The game mechanics
1. The users will take turn in counting number in 1 increment and clap if there is 3, 6, 9 present in the number.
2. There is 10% chance of player losing and this is calculated using getRandomInt(min = 0, max = 9) and by checking if it returns 0.
3. useInterval custom hook is used to increment the count, change players turn, and to check if player lost.
4. If player is lost it shows losing player name.
5. The game can be restarted or end with corresponding button.
