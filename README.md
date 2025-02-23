# The UGC Tracker
The UGC Tracker is a program made in Preact, Tauri, and Vite. Making the smallest bundle possible (around 15-16 Megabytes in installation size, while the .msi file is around 5 Megabytes)

Tauri is also secure, making it so we have to explicitly tell it that "Hey, we want this to happen, we dont want this to happen", etc. And because it's made in Rust and doesnt run Chrome or whatever, it has the smallest RAM/CPU usage!

The UGC Tracker is used by putting in a keyword, then TUT will search the first three pages. The operator of the program must flag the item depending if they want it flagged or not. Once they have stopped flagging (either by pressing the "Conclude Search" button or finishing all the results, which can range from 90 to 700+ items depending on the user's settings), they can export it to either:
- A JSON File (used for banlists)
- A Text File (used for reporting)
- A JSON file hosted on Gists and other services. (for convenience)