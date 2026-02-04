# Ladybug Calculator

## What
A calculator app with React and Typescript, but made saucy by having the buttons be bugs or petals or other garden objects. The look is inspired by Charley Harper. 

## What TF
Behaviour on the smartphone I won't replicate here:

1. On smartphone I enter 5x5-13x2 = -1

It displays

5x5-13x2

-1

When I hit del (one char del at a time vs a/c), i see - (just the negative sign). As a user, I hate that. I don't see myself (or anyone else) deleting -1 and expecting - to then start so the next number is -3 or whatever.

2. The AC button on my smartphone turns into a C when I type. If I click C, the most recently entered number (full number, not digit) is deleted. If it's an operator, nothing happens. Once that number is deleted, C turns into AC and the entire things is cleared. That's fine when you have 12 + 34, but if you have many numbers and more than one operator, then you can't just clear step by step. Either give me the opportunity to clear each bit of the expression to correct myself (maybe I meant 23 + 34 - 12 and not 23 + 34 x 12) or just clear all always. Don't make me hit C for the last full number and then del after that. I'm even irritated writing this out. 

for this reason, I have left AC to always be all clear and del to always be one digit or operator sign at a time.