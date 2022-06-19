# WeTalk
WeTalk is a flexible and lightweight messaging platform. Complete with a web client, Android and Windows applications, WeTalk is available on most of the popular platforms. Behind the scenes, a powerful server keeps everything synchronized.
<br>
<b>Important note</b>
We were asked to add in this file the fact that we worked in a trio but following the wedding of
one of the participants we received permission not to realize a horizontal screen.
<br>
<br><br>
<b>Tools:</b>
Server             | Web client | Android App
:-------------------------:|:-------------------------:|:-------------------------:
| <ul><li>SignalR</li><li>Asp.net</li></ul>| <ul><li>ReactJS</li><li>NodeJS</li><li>HTML/CSS</li><li>React-router, React-bootstrap</li></ul> | <ul><li>Android Studio</li><li>FireBase</li><li>Room</li><li>RetroFit</li><li>DataBase</li></ul> | 

# Getting Started
First start up the server. This can be done by accessing the solution.sln file in WeTalk/server/solution.sln. If you do not have the dependencies listed below, download them using the NuGet package manager in visual studio.
In addition, in the Package Manager Console run the commands:<code>Update-Database</code>
Next, we run the Andriod App.
<br>The main user is **Rotem123**, with password **12345678r**.<br>
You can log in with this information on the Login page.
When you click on the "Add Contact" button, you can add a contact to talk with the main user. To add a contact from the server we are on, you will need to register it first on the sign-up page.
<br>our server IP - **127.0.0.1** and port **5013**.<br>
You can also add a contact that is on another server.

# Server Dependencies (Can be installed via NuGet Package Manager)

<ul>
<li>Microsoft.AspNetCore.Authentucation.JwtBearer</li>
<li>Microsoft.EntityFrameworkCore.SqlServer</li>
<li>Microsoft.VisualStudio.Web.CodeGeneration.Design</li>
<li>Microsoft.AspNetCore.Authentication</li>
<li>Microsoft.AspNetCore.Http</li>
<li>Microsoft.EntityFrameworkCore.Tools</li>
<li>Swashbuckle.AspNetCore</li>
<li>System.IdentityModel.Tokens.Jwt</li>
</ul>



