florence_win8
=============

A Windows 8 client for Florence based applications. Florence is a framework for building accessible web applications using W3C Widgets.

Directory Structure
-------------------

### Client

This is the a Windows 8 Store application to demonstrate the hosting
of Florence based apps.

### widgets

This houses all the widgets used in the demo application. These serve to demonstrate the features of the Florence framework.

To deploy widgets into the Client:

ant generate-all-widgets -Dwidget.indclude=INCLUDE_PATTERN

Where INCLUDE_PATTERN is replaced by a pattern that matches the widgets you want to deply. For example, you could use *Player to deploy all the player widgets.

Development
-----------

Florence widgets are widgets built using the templating system in Apache Wookie. To build the widgets in the "widgets" directory you must first checkout Apache Wookie into a directory called wookie alongside your florence_win8 checkout.

The Client application uses the Connector library provided by Apache Wookie.