var formidable = require("formidable");


exports.checkLogin = function(req,res,next){
    if(req.session.login != true || req.session.role != "admin"){
//      console.log(req.session.login);
//			重定向到指定路径的URL
        res.redirect("/admin/login");
        return;
    }

    next(); //放行中间件，此时要回到app.js文件中，继续匹配下面的中间件。
}


exports.showAdminDashborad = function(req,res){
    if(req.session.login != true || req.session.role != "admin"){
        res.redirect("/admin/login");
        return;
    }
	res.render("admin/index",{
		page : "index"
	});
}
exports.showAdminReport = function(req,res){
	console.log(page)
	res.render("admin/report",{
		page : "report"
	});
}
exports.showLogin = function(req,res){
	res.render("admin/login",{

	});
}
exports.doLogin = function(req,res){

	//有两种情况：根据 "changedPassword" : false还是true，来决定：
	//false：用户没有更改密码，此时直接和数据库中比较password字段是否完全一致即可。
	//true：用户已经更改了密码，此时数据库中存储的是MD5加密之后的密码
	var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
    	if(err){
    		res.json({"result" : -1});	//-1表示服务器错误
    		return;
    	}
    	var sid = fields.sid;			//用户输入的用户名
    	var password = fields.password;	//用户输入的密码
//      console.log(fields);
    	if(sid == "admin" && password == "admin"){
    		req.session.login = true;
    		req.session.role = "admin";
    		res.json({"result" : 1});
    	}else{
    		res.json({"result" : -2});
    	}
    });
}