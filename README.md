## Item Learned Status: M
- Property of the item, determines frequency bit reappears in queue
- Starts at minimum value of 2 (unlearned)
- Increases with 3 sequential successes
- Decreases with failure
- Max # or Do we stop asking about an item that's 'super' learned?

Example question patterns:
0x0x0xx0xx0xx0xxxx0xxxx0xxxx0....

0x0x0xx0x0x0x0xx0xx0xx0xxxx0xx0xx0xx0


0x0x0xx0xx0xx0xxxx0xxxx0xxxx0

# User Stories

## Dave
Dave wants to learn a new language and heard that carloben.info was a great place to practice new vocabulary. He:

- likes the idea of spaced repetition, so that he doesn't have manage a physical stack of flashcards and decide when to remove cards from the stack and add new ones.
- wants the app to adjust to his learning pace over time, so that the words he struggles with are reviewed more frequently
- wants his progress saved with every question, so that he can review 1 or 100 words in any one session without having to worry about saving his progress or losing his place
- wants to be able to access the site from his laptop or phone seamlessly
- be able to log in and out using google authentication
- be able to change languages (english to spanish and spanish to english)

On his wishlist are some additional features:
- being able to add new words to the stack
- being able to correct cards if he finds mistakes
- being able to take notes on the answer side of the card (maybe just an edit of the card)
- manually flag cards for more or less repetition (in case certain terms are very important for his needs)


## Endpoints

### Submit Answer: POST to `/users/:userName`
- Body: { "answer": true/false }

### New user: POST to `/users`
- Body: { "username": "User Name" }
- RES: { "message": "User created" }

### Get Question: GET to `users/:username`
- RES: question object & score
- Usually used only for first question.

