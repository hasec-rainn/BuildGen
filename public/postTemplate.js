(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"post\">\r\n    <p class=\"post-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"postName") || (depth0 != null ? lookupProperty(depth0,"postName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postName","hash":{},"data":data,"loc":{"start":{"line":2,"column":25},"end":{"line":2,"column":37}}}) : helper)))
    + "</p>\r\n    <p class=\"post-type\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"postType") || (depth0 != null ? lookupProperty(depth0,"postType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postType","hash":{},"data":data,"loc":{"start":{"line":3,"column":25},"end":{"line":3,"column":37}}}) : helper)))
    + "</p>\r\n    <p class=\"post-author\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"postAuthor") || (depth0 != null ? lookupProperty(depth0,"postAuthor") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postAuthor","hash":{},"data":data,"loc":{"start":{"line":4,"column":27},"end":{"line":4,"column":41}}}) : helper)))
    + "</p>\r\n    <p class=\"post-date\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"postDate") || (depth0 != null ? lookupProperty(depth0,"postDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postDate","hash":{},"data":data,"loc":{"start":{"line":5,"column":25},"end":{"line":5,"column":37}}}) : helper)))
    + "</p>\r\n	<p class=\"post-data\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"postData") || (depth0 != null ? lookupProperty(depth0,"postData") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postData","hash":{},"data":data,"loc":{"start":{"line":6,"column":22},"end":{"line":6,"column":34}}}) : helper)))
    + "</p>\r\n</div>";
},"useData":true});
})();