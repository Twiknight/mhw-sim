var ghpages = require('gh-pages');
 
ghpages.publish('dist/mhw-sim', function(err) {
    if(err){
        console.log(err);
    }
});