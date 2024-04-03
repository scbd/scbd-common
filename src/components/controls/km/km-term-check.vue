<template>    
    <div class="km-terms-check">
        <div class="row">
            <div class="col-12" v-if="enableSearch" style="margin-bottom: 5px;">        
                <div class="input-group float-start" style="max-width:400px;">
                    <input  type="text" v-model="searchKeyword" class="form-control" placeholder="{{::('kmTermCheckT.search'|$translate)}}"/>
                    <span class="input-group-text" id="basic-addon2">
                        <i class="fa fa-search" ></i>
                    </span>
                </div>
                <span style="position: relative; top:10px; margin-left:20px"> <i class="color-blue"><span ng-bind="binding.length || '0'"></span> {{::('kmTermCheckT.keywords'|$translate)}}</i></span>
            </div>
        </div>
        <div class="row">
            <div class="col-12 pt-2" >
                <div v-if="searchKeyword && searchKeyword.length > 2"  class="optionsbox">
                    <table class="table table-condensed" >
                        <tr v-for="term in filteredList = (searchList|filter:hasMatch)">
                            <td  :class="{'no-border':$first}">
                                <label>
                                    <input type="checkbox" v-model="selectedItems[term.identifier].selected" @change="save(term.identifier)" 
                                        ng-required="IsRequired()" value="{{term.identifier}}"/> <span class="color-litegrey" ng-bind-html="term.displayTitle | lstring:locale"></span>
                                </label>
                            </td>
                        </tr>
                        <tfoot>
                            <tr>
                                <td>
                                    <button type="button" class="btn btn-primary" @click="$parent.searchKeyword=undefined">Close</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <p v-if="!filteredList.length"> {{::('kmTermCheckT.keywordNotFound'|$translate)}} </p>
                </div>
        
                <div :class="{'searchbox': enableSearch}" >        
                    <button type="button" class="btn btn-outline-secondary btn-sm float-end easing" @click="clear()" v-if="binding.length>0">
                        {{::('kmTermCheckT.clearSelection'|$translate)}}
                    </button>

                    <ul v-if="!tabularShape" class="list-unstyled pl-0">	        
                        <li v-for="term in rootTerms" ng-class="{'other-term': otherTermIdentifier==term.identifier}" ng-include="'term-check-tree-renderer.html'">

                        </li>        
                        <li ng-show="error">
                            <div class="alert" ng-bind="error">
                            </div>
                        </li>        
                        <li ng-show="__loading">
                            <i class="fa fa-spinner fa-spin"></i> {{::('kmTermCheckT.loading'|$translate)}}
                        </li>   
                    </ul>

                    <div v-if="tabularShape" class="tabular-terms col-xs-12">
                        <div class="col-md-4 col-xs-6 terms" v-for="term in rootTerms" ng-include="'term-check-tree-renderer.html'"></div>				
                    </div>
        
                    <script type="text/ng-template" id="term-check-tree-renderer.html">
                        <label>
                            <input type="checkbox" v-model="selectedItems[term.identifier].selected" @change="save(term.identifier)" 
                                ng-required="IsRequired()" value="{{term.identifier}}" id="chk_{{term.identifier|escapeHtmlAttributeId}}"/>
                                <span ng-bind-html="term.title||term.name | lstring:locale"></span>
                        </label>

                        <div v-if="(otherTermIdentifier==term.identifier ||term.type) && !term.multiple && selectedItems[term.identifier].selected">
                            <div style="padding-left:15px;"> 
                                <label v-if="term.type" name="chk_{{term.identifier|escapeHtmlAttributeId}}_customValue" for="chk_{{term.identifier|escapeHtmlAttributeId}}_customValue">
                                    {{::('kmTermCheckT.pleaseSpecify'|$translate)}}
                                </label>
                                <input v-if="term.type=='int'" type="number" placeholder="{{::customValuePlaceholder}}"
                                    v-model="selectedItems[term.identifier].customValue" class="km-terms-check-add-input-int" @change="save()" />
                            
                                <div v-if="term.type=='lstring'" km-textbox-ml name="custom value"  placeholder="{{::customValuePlaceholder}}"
                                    required v-model="selectedItems[term.identifier].customValue" locales="locales"  ng-change="save()"></div>
                            </div>
                        </div>

                        <span v-if="(otherTermIdentifier==term.identifier || term.type) && term.multiple && selectedItems[term.identifier].selected">
                            <table class="table table-hover others" style="padding:0;margin:0;width:100%;">
                                <tr v-for="element in otherElements[term.identifier]">
                                    <td ng-show="otherElements[term.identifier].length > 1" class="text-center" style="vertical-align:middle;width:30px;">
                                        <i class="fa fa-remove color-red" style="cursor:pointer" v-if="otherElements[term.identifier].length > 1 && !$last" ng-click="deleteOtherElement(element, otherElements[term.identifier]);"></i>
                                    </td>
                                    <td>
                                        <div km-textbox-ml ng-model="element.customValue" locales="locales" required="true" placeholder="{{::('kmTermCheckT.otherElement'|$translate)}}" ng-change="appendEmptyOther(otherElements[term.identifier])"></div>
                                    </td>
                                </tr>
                            </table>
                        </span>

                        <div class="km-select-description" v-if="showDescription && term.description" v-bind="term.description|lstring:locale" style="padding: 3px 25px;">
                        </div>

                        <ul class="list-unstyled">
                            <li v-for="term in term.narrowerTerms" ng-include="'term-check-tree-renderer.html'">
                        </ul>
                    </script>
                </div>
            </div>
        </div>    
    </div>
</template>

<script setup>  
    import $ from 'jquery';
    import template from 'text!./km-terms-check.html';
    import Enumerable from 'linqjs';
    import _ from 'lodash';
    import kmTermCheckT from '~/app-text/components/scbd-angularjs-controls/form-control-directives/km-term-check.json';
    //https://github.com/scbd/absch.cbd.int/blob/master/app/components/scbd-angularjs-controls/form-control-directives/km-terms-check.js


    /*
            restrict: 'EAC',
            template: template,
            replace: true,
            transclude: false,
            require: "?ngModel",
            scope: {
                binding: '=ngModel',
                bindingType: '@',
                termsFn: '&terms',
                required: "@",
                layout: "@",
                locales: '=?',
                beforeSearch: '&?',
                onOptionSelected: '&?'
            },
    */



    const init = () => {
        setError(null);
        __loading = true;

        var qData = termsFn();

        if (qData === undefined)
            return timeout(init, 250); // MEGA UGLY PATCH

        $q.when(qData,
            function(data) { // on success
                __loading = false;
                terms = data;
            },
            function(error) { // on error
                __loading = false;
                setError(error);
            }
        );
    }


    const load = () => {
        if (!terms) // Not initialized
            return;

        var oNewIdentifiers = {};
        var oNewOthers = {};
        if (!$.isArray(terms))
            throw "Type must be array";

        if (binding) {

            if (!$.isArray(binding))
                throw "Type must be array";

            for (var i = 0; i < binding.length; ++i) {
                if(!binding[i])
                    continue;
                    
                if (bindingType == "string[]") 
                    oNewIdentifiers[binding[i]] = {selected : true};
                else if(bindingType == "term[]"){
                    oNewIdentifiers[$scope.binding[i].identifier] = {selected : true, customValue:binding[i].customValue};

                    if(terms){
                        var term = _.find(terms, {identifier:binding[i].identifier})
                        if(term && term.multiple && (term.identifier==otherTermIdentifier || term.identifier.indexOf('#'+otherTermIdentifier))){
                            if(!oNewOthers[term.identifier])
                                oNewOthers[term.identifier] = [];

                            oNewOthers[term.identifier].push({customValue :binding[i].customValue});                                        
                        }
                    }
                }
                else throw "bindingType not supported";

                // if ($scope.bindingType == "string[]") oNewIdentifiers[$scope.binding[i]] = true;
                // else if ($scope.bindingType == "term[]") oNewIdentifiers[$scope.binding[i].identifier] = true;
                // else throw "bindingType not supported";
            }                        
        }

        if (!angular.equals(oNewIdentifiers, selectedItems)){
            selectedItems = oNewIdentifiers;
        }
        
        _.forEach(oNewOthers, function(customValues, key){
            var lOtherElements = _.filter(otherElements[key], function(term){return term.customValue});
            if (!angular.equals(customValues, lOtherElements))
                otherElements[key] = customValues;
        })

        save();
     
    }
</script>