# Instructions
1. Clone the repo

        git clone https://github.com/shaununderwood/javascript-exercise.git`

2. install dependancies

        npm i

3. start a terminal and execute webpack build

        npm run dev

4. start another terminal and execute webserver

        npm run serve

5. Now navigate to the program by clicking on one of the links step (4) provides, or visit

        http://localhost:8000/

6. To change the target json files, edit the following file

        ./src/client/app/services/api.js

# Commentary
* I decided to use React for this task as I'm picking it up now, and finding it very interesting.
* The json data is being pulled from the server URLs provided in the exercise
* The user dropdown selects a user, the address is populate directly from that
* Changing the user causes the data model to update and repopulate with posts and comments of that user
* Posts are restricted to 4 lines, giving the pagination control something to chew on.  There seems no variety in the number of posts per user, but if there were the pagination control would adapt by increasing or decreasing the pages available to select.
* Post comments are indicated by the green badge, their count being showing in the badge, again if numbers varied other values equal to comments.length would be provided
* Click the green badge for the grand reveal! Lovely colours there.
* The company website opens a new tab, and the MapLink I left for post MVP.
* I did one adjustment to data; comments are copied over into their respective post objects with ApplicationContainer collects the json data, allowing the data to trickle down the view model.

Any problems I can be contact on on shaun.u@sunderwood.co.uk
