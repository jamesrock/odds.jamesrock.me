(function() {

	/*
	
		But just what is the point?
		
		Well - normally you'd stake £10 on a single horse in a race. If you see a win, and your odds are decent; you'll get a nice return - however - if your horse is beaten to the post; you'll lose your entire stake. 
		
		All punters know that they're banking on an outsider winning in order to return well - trouble is; how do you locate that likely outsider without losing large sums of money in stakes?
		
		Is there a way to return the stake?
	
	*/

	var 
	MATH = ROCK.MATH,
	calc = function(number) {
		
		return ROCK.MATH.floorTo(number, 100);
	
	},
	currency = MATH.toCurrency,
	percent = MATH.getXPercentOfY,
	getOddsMultiplier = function getOddsMultiplier(a, b) {
		
		var
		c = (a+b),
		d = (c/b);
		
		return d;
		
	},
	getOdds = function getOdds(stake, oddsMultiplier) {
	
		return currency(stake*oddsMultiplier);
		
	};

	var Race = ROCK.Race = ROCK.Object.extend({
		constructor: function Race(name, winnerId) {
		
			this.name = name;
			this.entrants = new ROCK.Collection();
			this.winnerId = winnerId;
			
		},
		setEntrant: function(id, odds, oddsTo) {
		
			this.entrants.append(new RaceEntrant(id, odds, oddsTo));
			
		},
		testWinOf: function(id) {
			
			//return new RaceWinStats(this, id);
			
		},
		getEntrantsCount: function() {
		
			return this.entrants.length;
			
		},
		getWinSummary: function() {
			
			var
			_return = [],
			race = this;
			
			this.entrants.each(function(entrant) {
				
				_return.push(race.testWinOf(entrant.id).toString());
				
			});
			
			return _return.join("\n");
			
		},
		getTotalStake: function() {
			
			return (this.stakePerEntrant*this.getEntrantsCount());
			
		},
		getWinner: function() {
			
			return this.entrants.getItemByKeyValue("id", this.winnerId);
			
		},
		getWinnings: function() {
			
			return calc(this.stakePerEntrant*this.getWinner().oddsMultiplier);
			
		},
		stakePerEntrant: 1.00
	});
	
	var RaceEntrant = ROCK.Object.extend({
		constructor: function RaceEntrant(id, odds, oddsTo) {
		
			this.id = id;
			this.odds = odds;
			this.oddsTo = oddsTo;
			this.oddsMultiplier = getOddsMultiplier(odds, oddsTo);
			
		},
		getDisplayOdds: function getDisplayOdds() {
		
			return [this.odds, this.oddsTo].join("/");
			
		}
	});
	
	var RacePool = ROCK.RacePool = ROCK.Object.extend({
		constructor: function RacePool() {
	
			this.races = new ROCK.Collection();
			
		},
		setRace: function(race) {
		
			this.races.append(race);
			
		},
		getSummary: function() {
			
			var
			summary = [],
			totalWinnings = 0,
			totalStake = 0;
			
			summary.push(["Entrants", "Winner Odds", "Winnings", "Stake", "Return"].join("\t\t"));
			
			this.races.each(function(race) {
				
				var 
				winner = race.getWinner(),
				winnerOdds = winner.getDisplayOdds(),
				entrantsCount = race.getEntrantsCount(),
				winnings = race.getWinnings(),
				stake = race.getTotalStake();
				
				totalStake += stake;
				totalWinnings += winnings;
				
				summary.push([entrantsCount, winnerOdds, currency(winnings), currency(stake), currency(winnings-stake)].join("\t\t"));
				
			});
			
			summary.push("---------");
			summary.push("Number of races: " + this.getRaceCount());
			summary.push("Total stake: " + currency(totalStake));
			summary.push("Total winnings: " + currency(totalWinnings));
			summary.push("Return: " + currency(totalWinnings-totalStake));
			
			return summary.join("\n");
			
		},
		getRaceCount: function() {
			
			return this.races.length;
			
		}
	});
	
})();