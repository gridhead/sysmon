# sysmon
An intuitive system performance monitoring tool

## Features
- Simplistic implementation of asynchronous periodic AJAX calls to fetch information
- Relatively low overhead from the server during stat (approx. 4MB over runtime usage)
- Easy and flexible customization of interface by replacing the assets with your own
- Tweakable refresh times for dynamic information with endpoints powered by `psutil`

## Usage
1.  Install and upgrade virtualenv if not already done by executing `pip3 install virtualenv --user`
2.  Clone the repository on your local drive and make it your current working directory
3.  Create a virtual environment by executing `virtualenv venv`
4.  Activate the virtual environment by executing `source venv/bin/activate`
5.  Install all dependencies for the project by executing `pip3 install -r requirements.txt`
6.  Run the project server by executing `python3 main.py`
7.  Take a note of the computer's IP address and make sure that it is reachable
8.  Visit `http://<YOUR-IP-ADDRESS>:9696` from the other device (or `http://localhost:9696` on the same PC)
9.  When done tinkering, deactivate the virtual environment by executing `deactivate`
10. Give stars to the repository if it was helpful

## To-do
- [X] Write driver code and endpoint access code for **Processor** page
- [X] Write client-side Jinja template and AJAX calls for **Processor** information
- [X] Write driver code and endpoint access code for **Memory** page
- [X] Write client-side Jinja template and AJAX calls for **Memory** information
- [X] Write driver code and endpoint access code for **Disks** page
- [X] Write client-side Jinja template and AJAX calls for **Disks** information
- [X] Write driver code and endpoint access code for **Network** page
- [X] Write client-side Jinja template and AJAX calls for **Network** information
- [X] Write driver code and endpoint access code for **Sensors** page
- [X] Write client-side Jinja template and AJAX calls for **Sensors** information
- [X] Write driver code and endpoint access code for **About** page
- [X] Write client-side Jinja template and AJAX calls for **About** information
- [ ] Write driver code and endpoint access code for **Thermal** page
- [ ] Write client-side Jinja template and AJAX calls for **Thermal** information
- [ ] Write driver code and endpoint access code for **Miscellaneous** page
- [ ] Write client-side Jinja template and AJAX calls for **Miscellaneous** information
- [ ] Write driver code and endpoint access code for **Processes** page
- [ ] Write client-side Jinja template and AJAX calls for **Processes** information
- [ ] Highlight useful information in a much less granular manner
- [ ] Add data visualization with line graph, bar graph and donut charts
- [ ] Cleanup asynchronous calls and optimize them for speedup
- [ ] Add element in the frontend to help modify refresh rate from the frontend
- [ ] Cleanup decorators in backend and optimize them for efficiency
- [ ] Add a documentation about theming guidelines
- [ ] Add client-side theming option using Javascript, unretained across sessions
- [ ] Add JQuery dependencies to be loaded up from local storage
- [X] Add custom font dependencies to be loaded up from local storage
- [ ] Add monotype fonts for numeric values
- [ ] AJAX calls should replace the value of a `<span>` element only
- [ ] Include functionality of server-side theming using Jinja
- [ ] Clean up fetches which require creation and population separately
- [ ] Limit endpoints to ONE by dispersing all information from single endpoint
- [ ] Include JSON (or YAML) based customizations for enabling/disabling sections
- [ ] Add a PRINT document button at the top-right corner of the UI
- [ ] Prevent text-selection/drag-drop capabilities in the UI
- [ ] Make a `document.window.href` for external links and ensure opening in new tab
- [ ] Add dynamic refeshing functionality to disk partitions and network interfaces sect
- [ ] Fix responsiveness in cards for disk partition listing
- [ ] Trim numerical information to have much lesser accuracy
- [ ] Correct tabinations and code sanity in the client-side code
- [ ] Add functionality to switch the units for thermal data between celsius and fahrenheit
- [ ] Add an obligatory dark mode feature (for everybody else has it now)


## Bugs
- Modern UI
    - May require hard refreshing (`Ctrl+Shift+R`) followed by a normal refresh (`Ctrl+R`) to get proper data in knob
    - Responsiveness is broken in cases where the line follows on to be too long without spaces
    - CSS colors specified by the boilerplate do not match with the one specified in the standard
    - The process modal does not refresh - data shown in the modal is at taken at the time of opening
    - Multiple data elements are expressed in uncannily long, bigger and unnecessary accuracies
    - Minor slow downs are expected as all data elements are fetched and refreshed separately

## Screenshots

### Dashboard / Processor
![procinfo.png](pictures/procinfo.png)

### Dashboard / Memory
![memoinfo.png](pictures/memoinfo.png)

### Dashboard / Disks
![diskinfo.png](pictures/diskinfo.png)

### Dashboard / Network
![netwinfo.png](pictures/netwinfo.png)

### Dashboard / Sensors
![sensinfo.png](pictures/sensinfo.png)

### Dashboard / About
![abotinfo.png](pictures/abotinfo.png)

## Helpful
1. https://stackoverflow.com/questions/15721679/update-and-render-a-value-from-flask-periodically

## Contribute
The project is currently in diverse development process. The codebase needs cleanup, optimization and documentation so one may find it hard to get their hands into it. Feel free to contact me at akashdeep.dhar@gmail.com if you wish to contribute.