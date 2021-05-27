# BuildGen
BuildGen Project for CS 290. The purpose of BuildGen is to generate and post, through written descriptions, rooms and buildings for games such as D&amp;D and Pathfinder. The practical use of this is for Game Masters, who can use this to quickly find and/or create rooms and the insides of buildings for use in making towns, cities, dungeons, etc.

How it might work:
  * The user selects the theme(s) they want their room/building to have
  * They click on a "Generate!" button
  * BuildGen clears the Description Box and pastes a randomly generated room/building with the theme(s) they wanted

How the room/building descriptions might be generated:
  * A room is divided into five parts: North, East, South, West, and Center. Each of these five parts can be filled with various items, furniture, etc.
  * Each theme has its own file themeName.js. This file contains descriptions associated with that theme that can be read in. The read-in descriptions can then be used to describe one of the five parts of a room/building.
  * When a theme is selected by the user, a boolean will let BuildGen know to use that file when generating rooms.
  * When generating the room/building, BuildGen does the following:
      * From the themes selected by the user, choose a random theme
      * From that random theme's themeName.js file, select a random descriptor
      * Add a transitional phrase such as "Looking to the west side of the room...", "In the center of the room...", etc.
      * Apply the descriptor to one part of the room
      * Do the above 4 bullets while there are still parts of the room left to describe
      * Paste the full room description into the Description Box
