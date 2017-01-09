module.exports = {
    stringToBodyPart( bodyPart ) {
        if( bodyPart == TOUGH ||
            bodyPart == "THOUGH" ) {
            return TOUGH;
        } else if( bodyPart == MOVE ||
            bodyPart == "MOVE" ) {
            return MOVE;
        } else if( bodyPart == CARRY ||
            bodyPart == "CARRY" ) {
            return CARRY;
        } else if( bodyPart == WORK ||
            bodyPart == "WORK" ) {
            return WORK;
        } else if( bodyPart == ATTACK ||
            bodyPart == "ATTACK" ) {
            return ATTACK;
        } else if( bodyPart == RANGED_ATTACK ||
            bodyPart == "RANGED_ATTACK" ) {
            return RANGED_ATTACK;
        } else if( bodyPart == HEAL ||
                    bodyPart == "HEAL" ) {
            return HEAL;
        } else if( bodyPart == CLAIM ||
                    bodyPart == "CLAIM" ) {
            return CLAIM;
        }
        console.log( "Unknown bodyPart " + bodyPart );
        return undefined;
    },
    getBodyPartCost( bodyPart ) {
        bodyPart = this.stringToBodyPart( bodyPart );
        if( bodyPart == TOUGH ||
            bodyPart == "THOUGH" ) {
            return 10;
        } else if( bodyPart == MOVE ||
            bodyPart == "MOVE" ) {
            return 50;
        } else if( bodyPart == CARRY ||
            bodyPart == "CARRY" ) {
            return 50;
        } else if( bodyPart == ATTACK ||
            bodyPart == "ATTACK" ) {
            return 80;
        } else if( bodyPart == WORK ||
            bodyPart == "WORK" ) {
            return 100;
        } else if( bodyPart == RANGED_ATTACK ||
            bodyPart == "RANGED_ATTACK" ) {
            return 150;
        } else if( bodyPart == HEAL ||
                    bodyPart == "HEAL" ) {
            return 250;
        } else if( bodyPart == CLAIM ||
                    bodyPart == "CLAIM" ) {
            return 600;
        }
        console.log( "Unknown bodyPart " + bodyPart );
        return undefined;
    },
    judgeLoadout( loadOut ) {
        var retval = 0;
        for( bodyPartIndex in loadOut ) {
            retval += this.getBodyPartCost( loadOut[bodyPartIndex] );
        }
        return retval;
    },
    balanceLoadout( baseLoadout, bodyPartCosts, energyBudget ) {
        var finalLoadout = baseLoadout;
        var bodyPartTotalCost = {};
        for( bodyPartCostKey in bodyPartCosts ) {
            bodyPartTotalCost[bodyPartCostKey] = 0;
        }
        while( finalLoadout.length < 50 &&
                this.judgeLoadout( finalLoadout ) < energyBudget )
        {
            var leftOverBudget = energyBudget - this.judgeLoadout( finalLoadout );
            var lowestAffordableBodyPart = undefined;
            var lowestAffordableBodyPartTotalCost = 100000;
            for( bodyPartCostKey in bodyPartCosts ) {
                var totalCost = bodyPartTotalCost[bodyPartCostKey] + bodyPartCosts[bodyPartCostKey];
                if( totalCost < lowestAffordableBodyPartTotalCost ) {
                    if( leftOverBudget >= this.getBodyPartCost( bodyPartCostKey ) ) {
                        lowestAffordableBodyPart = bodyPartCostKey;
                        lowestAffordableBodyPartTotalCost = totalCost;
                    }
                }
            }
            if( lowestAffordableBodyPart ) {
                finalLoadout.push( this.stringToBodyPart( lowestAffordableBodyPart ) );
                bodyPartTotalCost[ lowestAffordableBodyPart ] = lowestAffordableBodyPartTotalCost;
            } else {
                return finalLoadout;
            }
        }
        return finalLoadout;
    },
};