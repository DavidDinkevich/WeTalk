# WeTalk
WeTalk is a flexible and lightweight messaging platform. Complete with a web client, Android and Windows applications, WeTalk is available on most of the popular platforms. Behind the scenes, a powerful server keeps everything synchronized.
<br><br>
<b>Tools:</b>
Server             | Web client | Android App | Windows App
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
| <ul><li>SignalR</li><li>Asp.net</li></ul>| <ul><li>ReactJS</li><li>NodeJS</li><li>HTML/CSS</li><li>React-router, React-bootstrap</li></ul> |  | 

# Getting Started
First start up the server. This can be done by accessing the solution.sln file in WeTalk/server/solution.sln. If you do not have the dependencies listed below, download them using the NuGet package manager in visual studio.
In addition, in the Package Manager Console run the commands: <br>
<code>Add-Migrations Init</code> 
and then
<code>Update-Database</code>
<br>
Next, we run the web client. <b>Prior to doing so, we must configure the server address that the web client will connect to.</b> We can do this by modifying the <code>SERVER_NAME</code> variable in wetalk/src/Database.js.<br>
Now we can run the web client by navigating to the WeTalk directory and executing <code>npm start</code>.<br>

# Dependencies (Can be installed via NuGet Package Manager)

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

