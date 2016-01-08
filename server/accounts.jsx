var httpntlm = Meteor.npmRequire('httpntlm');
var Future = Npm.require( 'fibers/future' ); 

// overriding the main login hook
Accounts.registerLoginHandler(function(loginRequest) {

  // authentication logic
  var userinfo = networkLogin("MILKYWAY", loginRequest.username, loginRequest.password);

  // just checking again
  if (userinfo.error) {
    console.log(userinfo.error);
    return userinfo;
  } else {
    var userId = null;
    var user = Meteor.users.findOne({username: userinfo.username});
    if(!user) {
      // create account if it doesn't exist
      userId = Meteor.users.insert({
        username: userinfo.username,
        emails: [{email: userinfo.email, verified: true}],
        profile: {name: userinfo.dispname,
                  department: userinfo.department,
                  jobtitle: userinfo.jobtitle}
      });
    } else {
      userId = user._id;
    }
    // console.log(userinfo);

    //sending token along with the userId
    return {
      userId: userId
    };
  }
  return {error: new Meteor.Error(500, "Something went terribly wrong")};
});

// NTLM authentication through webmail using SOAP
networkLogin = function(domain, username, password) {
  var url = "https://webmail.olin.edu/ews/exchange.asmx";
  var wsdl = `<?xml version="1.0" encoding="utf-8"?>
              <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                             xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
                             xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types">
                <soap:Body>
                  <ResolveNames xmlns="http://schemas.microsoft.com/exchange/services/2006/messages"
                                xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types"
                                ReturnFullContactData="true">
                    <UnresolvedEntry>${username}</UnresolvedEntry>
                  </ResolveNames>
                </soap:Body>
              </soap:Envelope>`;

  // deal with async http request
  var future = new Future();

  httpntlm.post({
    url: url,
    username: username,
    password: password,
    workstation: '',
    domain: domain,
    body: wsdl,
    headers: {'Content-Type': 'text/xml; charset=utf-8'}
  }, function (err, res){
    var ret;
    if (err) {
      console.log(err);
      ret = {"error": new Meteor.Error(500, err)};
    } else if (res.statusCode != 200) {
      console.log("Error - %d", res.statusCode);
      ret = {"error": new Meteor.Error(res.statusCode, "Something went wrong with NTLM authentication")};
    } else {
      var ret = {
      "username": username,
      "dispname": /<t:DisplayName>(.+)<\/t:DisplayName>/g.exec(res.body)[1],
      "email": /<t:EmailAddress>(.+)<\/t:EmailAddress>/g.exec(res.body)[1],
      "department": /<t:Department>(.+)<\/t:Department>/g.exec(res.body)[1],
      "jobtitle": /<t:JobTitle>(.+)<\/t:JobTitle>/g.exec(res.body)[1]
      }
    }
    // console.log(user);

    future.return(ret);
  });

  return future.wait();
}