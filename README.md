# jsRapDateTimePicker
jQuery Plugin Date and Time Picker

More information about this can be found in this blog <a href="https://www.jqueryscript.net/time-clock/rap-date-time-picker.html">article</a>.

#### Demo

[https://thibor.github.io/jsRapCalendar/](https://thibor.github.io/jsRapDateTimePicker/) 

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
date | class Date | current date and time | Initializes the date and time
yearBefore | int | 5 | Number of visible years before the selected year
yearAfter | int | 5 | Number of visible years after the selected year
captions | array of strings | ['Year','Month','Day','Hour','Minute','Second'] | Names of visible time components
change | bool | false | date initialization treated as a date change

### Events

Event | Params | Description
------ | ---- | -------
onChange | year,month,day,hours,minutes,seconds | Fires after change date
