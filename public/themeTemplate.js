(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['theme'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li>\r\n    <input type=\"checkbox\" class = \"theme\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"themeName") || (depth0 != null ? lookupProperty(depth0,"themeName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"themeName","hash":{},"data":data,"loc":{"start":{"line":2,"column":47},"end":{"line":2,"column":60}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"themeType") || (depth0 != null ? lookupProperty(depth0,"themeType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"themeType","hash":{},"data":data,"loc":{"start":{"line":2,"column":61},"end":{"line":2,"column":74}}}) : helper)))
    + "\" name=\"theme-type\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"themeName") || (depth0 != null ? lookupProperty(depth0,"themeName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"themeName","hash":{},"data":data,"loc":{"start":{"line":2,"column":101},"end":{"line":2,"column":114}}}) : helper)))
    + "\">\r\n    <label for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"themeName") || (depth0 != null ? lookupProperty(depth0,"themeName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"themeName","hash":{},"data":data,"loc":{"start":{"line":3,"column":16},"end":{"line":3,"column":29}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"themeName") || (depth0 != null ? lookupProperty(depth0,"themeName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"themeName","hash":{},"data":data,"loc":{"start":{"line":3,"column":31},"end":{"line":3,"column":44}}}) : helper)))
    + "</label>\r\n</li>";
},"useData":true});
})();