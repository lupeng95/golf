matchData = new Mongo.Collection('match');

statData = new Mongo.Collection('statistic');
rankData=[]
rankData[0] = new Mongo.Collection('rank0')
rankData[1] = new Mongo.Collection('rank1')
rankData[2] = new Mongo.Collection('rank2')
rankData[3] = new Mongo.Collection('rank3')
rankData[4] = new Mongo.Collection('rank4')
rankData[5] = new Mongo.Collection('rank5')
rankData[6] = new Mongo.Collection('rank6')
rankData[7] = new Mongo.Collection('rank7')
rankData[8] = new Mongo.Collection('rank8')
rankData[9] = new Mongo.Collection('rank9')
rankData[10] = new Mongo.Collection('rank10')
rankData[11] = new Mongo.Collection('rank11')



if (Meteor.isServer) {


function addStat(newMatch){
  var uid = newMatch.userID;
  var stat = {userID:0,city:0,court:0,match:0,total:0,birdie:0,eagle:0,dEagle:0}
  var n = true;
  var s = statData.findOne({userID:uid})
  if(s){
    stat = s;
    n=false;
  }
  stat.userID = uid;


  // newMatch 已经存入
  var matches = matchData.find({userID:uid,valid:1},{fields:{city:1,courtID:1}}).fetch();
  if(matches.length==0){
    return
  }
  var city = _.pluck(matches,'city');
  city = _.uniq(city)
  stat.city = city.length;
  var court = _.pluck(matches,'courtID');
  court = _.uniq(court)
  stat.court = court.length;

  stat.match = stat.match+1;
  
  stat.total = stat.total+newMatch.summary.total;
  stat.birdie += newMatch.summary.birdie ;
  stat.eagle  += newMatch.summary.eagle;
  stat.dEagle  += newMatch.summary.dEagle;

  if(n){
    statData.insert(stat);
  }else{
    statData.update(stat._id,stat)
  }
 

}
function updateRank(user,match){
  var dd = moment().format('YYYY-M').split("-")
  var uid = user._id;
  var rank_default={year:parseInt(dd[0]),userID:uid,match:0,total:0,push:0,on:0,son:0,aTotal:0,aPush:0,aOn:0,aSon:0,username:user.profile.nick_name,avatar:user.profile.avtar_url}
  var n = false;

  var rank = rankData[dd[1]-1].findOne({userID:uid});
  if(!rank){
    rank = rank_default;
    n = true;
  }else if (rank.year!=dd[0]){
    rank = rank_default;
  }

  rank.match++;
  rank.total+=match.summary.total;
  rank.aTotal = parseInt(rank.total/rank.match)

  rank.push+=match.summary.push;
  rank.aPush = parseInt(rank.push/rank.match)

  rank.on+= match.summary.onRate
  rank.aOn = parseInt(rank.on/rank.match)

  rank.son+= match.summary.sOnRate
  rank.aSon = parseInt(rank.son/rank.match)

  if(n){
    rankData[dd[1]-1].insert(rank);
  }else{
    rankData[dd[1]-1].update(rank._id,rank);
  }


}

matchData.allow({
  insert: function(userId, doc) {
    return false;
  },
  update:function (userId, doc, fieldNames, modifier){
  	return false;
  },
  remove:function(userId, doc){
  	return false;
  }
});


Meteor.methods({
   delMatch: function(id){
  	var ret = {err:404};
  	var m = matchData.findOne(id);
  	if(m){
  		if(Meteor.userId() == m.userID){
  			matchData.remove(id);
  			ret.err=0;
  		}
  	}
  	return ret
  },
  updateMatch: function(match){
  	var ret = {err:404};
  	var m = matchData.findOne(match._id);
    var update = false;
  	match.valid = parseInt(match.valid)
  	if(m){
  		if(Meteor.userId() == m.userID){
  			if(m.valid==0 && match.valid==1){
          m.valid = match.valid;
          update = true;
  			}
  			m.record = match.record;
  			
  			matchData.update(m._id,m);

        if(update){
          addStat(match)
          updateRank(Meteor.user(),match)
        }
       
  			ret.err=0;
  		}
  	}
  	return ret
  },
  addMatch: function(match) {
    // check(Meteor.userId(), String);
    // check(activity, {
    //   recipeName: String,
    //   text: String,
    //   image: String
    // });

	  var total = 0;
    var push = 0;
    var onBase = 0;
    var on = 0;
    var onRate = 0;

    var sOnBase = 0;
    var sOn = 0;
    var sOnRate = 0;

    var birdie =0;
    var eagle =0;
    var dEagle = 0;

    var data = match.record;

    for (var i in data){
      total+=data[i].total;
      push+=data[i].put;
      if(data[i].par >3){
        onBase++;
        if (data[i].on){
          on++;
        }
      }

      var tt = data[i].par - 2;
      sOnBase++;
      if((data[i].total-data[i].put)<=tt){
        sOn++;
        
      }

      //Birdie
      var diff = data[i].par -data[i].total;
      if(diff == 1){
        birdie++;
      }else if(diff == 2){
        eagle++;
      }else if (diff ==3){
        dEagle++;
      }

    }

    if (onBase == 0){
      onRate = 0
    }else{
      onRate = parseInt(on*100/onBase)
    }

    if(sOnBase!=0){
      sOnRate = parseInt(sOn*100/sOnBase)
    }
    
    match.summary={total:total,push:push}
    match.summary.onRate = onRate; //开球上道率
    match.summary.sOnRate = sOnRate; //标on率
    match.summary.birdie = birdie;
    match.summary.eagle = eagle;
    match.summary.dEagle = dEagle;



	var total=0;
  
    if (Meteor.userId()===match.userID){
    	match.valid = 1;
    }else{
    	match.valid = 0;
    }

    match.createdAt = new Date;
    
    var id = matchData.insert(match);

    if(match.valid == 1){
      addStat(match)
      updateRank(Meteor.user(),match)
    }
    
    return id;
  }
});

}