# BuildGen
BuildGen Project for CS 290. The purpose of BuildGen is to generate and post, through written descriptions, rooms and buildings for games such as D&amp;D and Pathfinder. The practical use of this is for Game Masters, who can use this to quickly find and/or create rooms and the insides of buildings for use in making towns, cities, dungeons, etc.

How it might work:
  * The user selects the theme(s) they want their room/building to have
  * They click on a "Generate!" button
  * BuildGen clears the Description Box and pastes a randomly generated room/building with the theme(s) they wanted

How the room/building descriptions might be generated:
  * A room/building is divided into six parts: North, East, South, West, Center, and Overview. The first five parts can be filled with various items, furniture, etc. The last part, Overview, describes some general traits about the room (ex: "the room has a cobblestone floor", "the building smells of cheese").
  * Each theme has two files themeName.js and themeName_overview.js. These files contains descriptions associated with that theme that can be read in. The read-in descriptions can then be used to describe one of the six parts of a room/building.
  * When a theme is selected by the user, a boolean will let BuildGen know to use that file when generating rooms.
  * When generating the room/building, BuildGen does the following:
      * From the themes selected by the user, choose a random theme
      * Call the random themes' themeName.js files, each of which will send back a js-object containing random descriptors for each of the six parts of the room.
      * Add a transitional phrase such as "Looking to the west side of the room...", "In the center of the room...", etc.
      * Apply one of the object's descriptors to a part of the room (ex: apply spookyTheme.NorthDesc to North portion of the room)
      * Do the above 4 bullets while there are still parts of the room left to describe
      * Paste the full room description into the Description Box
