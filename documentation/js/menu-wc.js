'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">octo documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-6d5b23d92870d1f2668da9eb46de3a60"' : 'data-target="#xs-components-links-module-AppModule-6d5b23d92870d1f2668da9eb46de3a60"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6d5b23d92870d1f2668da9eb46de3a60"' :
                                            'id="xs-components-links-module-AppModule-6d5b23d92870d1f2668da9eb46de3a60"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-6d5b23d92870d1f2668da9eb46de3a60"' : 'data-target="#xs-injectables-links-module-AppModule-6d5b23d92870d1f2668da9eb46de3a60"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6d5b23d92870d1f2668da9eb46de3a60"' :
                                        'id="xs-injectables-links-module-AppModule-6d5b23d92870d1f2668da9eb46de3a60"' }>
                                        <li class="link">
                                            <a href="injectables/UrlBehaviorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UrlBehaviorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MapModule.html" data-type="entity-link">MapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MapModule-4a9dcea2d912c5582a8316743bb9f561"' : 'data-target="#xs-components-links-module-MapModule-4a9dcea2d912c5582a8316743bb9f561"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MapModule-4a9dcea2d912c5582a8316743bb9f561"' :
                                            'id="xs-components-links-module-MapModule-4a9dcea2d912c5582a8316743bb9f561"' }>
                                            <li class="link">
                                                <a href="components/LayerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayerConfigurationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayerConfigurationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayerPickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayerPickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link">AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CatalogComponent.html" data-type="entity-link">CatalogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategoryComponent.html" data-type="entity-link">CategoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DateFieldComponent.html" data-type="entity-link">DateFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EnumBehaviorComponent.html" data-type="entity-link">EnumBehaviorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link">HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ImageFieldComponent.html" data-type="entity-link">ImageFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayerConfigurationComponent.html" data-type="entity-link">LayerConfigurationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayerInformationComponent.html" data-type="entity-link">LayerInformationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayerManagerComponent.html" data-type="entity-link">LayerManagerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayerPresentationComponent.html" data-type="entity-link">LayerPresentationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapClickComponent.html" data-type="entity-link">MapClickComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapComponent.html" data-type="entity-link">MapComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OpenLayersComponent.html" data-type="entity-link">OpenLayersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PopupComponent.html" data-type="entity-link">PopupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextFieldComponent.html" data-type="entity-link">TextFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimeBehaviorComponent.html" data-type="entity-link">TimeBehaviorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TopicPickerComponent.html" data-type="entity-link">TopicPickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UrlFieldComponent.html" data-type="entity-link">UrlFieldComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActivateLayer.html" data-type="entity-link">ActivateLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddBaseLayer.html" data-type="entity-link">AddBaseLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddBehavior.html" data-type="entity-link">AddBehavior</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddLayer.html" data-type="entity-link">AddLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddPopup.html" data-type="entity-link">AddPopup</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppendCategories.html" data-type="entity-link">AppendCategories</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppendLayerCategoryIds.html" data-type="entity-link">AppendLayerCategoryIds</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppendRootCategoryIds.html" data-type="entity-link">AppendRootCategoryIds</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppendTopic.html" data-type="entity-link">AppendTopic</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/BehaviorHandlerFactory.html" data-type="entity-link">BehaviorHandlerFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/BingLayer.html" data-type="entity-link">BingLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/CatalogSelectedLayer.html" data-type="entity-link">CatalogSelectedLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link">Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearMapClickInfo.html" data-type="entity-link">ClearMapClickInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClickFormatterFactory.html" data-type="entity-link">ClickFormatterFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClickFormatterInfo.html" data-type="entity-link">ClickFormatterInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClickStrategy.html" data-type="entity-link">ClickStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClientPresentation.html" data-type="entity-link">ClientPresentation</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateField.html" data-type="entity-link">DateField</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteBehavior.html" data-type="entity-link">DeleteBehavior</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteLayer.html" data-type="entity-link">DeleteLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeletePopup.html" data-type="entity-link">DeletePopup</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmptyValidatorFactory.html" data-type="entity-link">EmptyValidatorFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnumHandler.html" data-type="entity-link">EnumHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchCategoriesForTopic.html" data-type="entity-link">FetchCategoriesForTopic</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchClickFormatter.html" data-type="entity-link">FetchClickFormatter</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchClickStrategy.html" data-type="entity-link">FetchClickStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchClientPresentations.html" data-type="entity-link">FetchClientPresentations</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchLayer.html" data-type="entity-link">FetchLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchLayerDescription.html" data-type="entity-link">FetchLayerDescription</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchTopic.html" data-type="entity-link">FetchTopic</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchTopicGroup.html" data-type="entity-link">FetchTopicGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/FieldClickFormatter.html" data-type="entity-link">FieldClickFormatter</a>
                            </li>
                            <li class="link">
                                <a href="classes/FieldFactory.html" data-type="entity-link">FieldFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageField.html" data-type="entity-link">ImageField</a>
                            </li>
                            <li class="link">
                                <a href="classes/Layer.html" data-type="entity-link">Layer</a>
                            </li>
                            <li class="link">
                                <a href="classes/LayerDescription.html" data-type="entity-link">LayerDescription</a>
                            </li>
                            <li class="link">
                                <a href="classes/MapClickInfo.html" data-type="entity-link">MapClickInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveDownLayer.html" data-type="entity-link">MoveDownLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveUpLayer.html" data-type="entity-link">MoveUpLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/NormalizedCategory.html" data-type="entity-link">NormalizedCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObjectPropertyLocator.html" data-type="entity-link">ObjectPropertyLocator</a>
                            </li>
                            <li class="link">
                                <a href="classes/OLLayerFactory.html" data-type="entity-link">OLLayerFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/OLSourceFactory.html" data-type="entity-link">OLSourceFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/PropertyLocatorFactory.html" data-type="entity-link">PropertyLocatorFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveAllCategories.html" data-type="entity-link">RemoveAllCategories</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveCategoryTree.html" data-type="entity-link">RemoveCategoryTree</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetClientPresentation.html" data-type="entity-link">SetClientPresentation</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetClientPresentations.html" data-type="entity-link">SetClientPresentations</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetCurrentBaseLayer.html" data-type="entity-link">SetCurrentBaseLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetCurrentClientPresentation.html" data-type="entity-link">SetCurrentClientPresentation</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetIsOpen.html" data-type="entity-link">SetIsOpen</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetLayerDescription.html" data-type="entity-link">SetLayerDescription</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetLayerInformation.html" data-type="entity-link">SetLayerInformation</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetLayerPosition.html" data-type="entity-link">SetLayerPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetLayerUniqueId.html" data-type="entity-link">SetLayerUniqueId</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetMapClickInfo.html" data-type="entity-link">SetMapClickInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSelectedLayerId.html" data-type="entity-link">SetSelectedLayerId</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSelectedTopic.html" data-type="entity-link">SetSelectedTopic</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetTopicGroup.html" data-type="entity-link">SetTopicGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/StylesFromLiterals.html" data-type="entity-link">StylesFromLiterals</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextField.html" data-type="entity-link">TextField</a>
                            </li>
                            <li class="link">
                                <a href="classes/TimeHandler.html" data-type="entity-link">TimeHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/TogglePopup.html" data-type="entity-link">TogglePopup</a>
                            </li>
                            <li class="link">
                                <a href="classes/Topic.html" data-type="entity-link">Topic</a>
                            </li>
                            <li class="link">
                                <a href="classes/TopicGroup.html" data-type="entity-link">TopicGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/TopicHierarchy.html" data-type="entity-link">TopicHierarchy</a>
                            </li>
                            <li class="link">
                                <a href="classes/TranslateServiceStub.html" data-type="entity-link">TranslateServiceStub</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBehavior.html" data-type="entity-link">UpdateBehavior</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategory.html" data-type="entity-link">UpdateCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLayer.html" data-type="entity-link">UpdateLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTopic.html" data-type="entity-link">UpdateTopic</a>
                            </li>
                            <li class="link">
                                <a href="classes/UrlField.html" data-type="entity-link">UrlField</a>
                            </li>
                            <li class="link">
                                <a href="classes/UrlParametersUtil.html" data-type="entity-link">UrlParametersUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/WfsLayer.html" data-type="entity-link">WfsLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/WmsHtmlEmpty.html" data-type="entity-link">WmsHtmlEmpty</a>
                            </li>
                            <li class="link">
                                <a href="classes/WmsLayer.html" data-type="entity-link">WmsLayer</a>
                            </li>
                            <li class="link">
                                <a href="classes/WmsStrategy.html" data-type="entity-link">WmsStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/WmsTextClickFormatter.html" data-type="entity-link">WmsTextClickFormatter</a>
                            </li>
                            <li class="link">
                                <a href="classes/WmsTextEmpty.html" data-type="entity-link">WmsTextEmpty</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BehaviorEffects.html" data-type="entity-link">BehaviorEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryEffects.html" data-type="entity-link">CategoryEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayerEffects.html" data-type="entity-link">LayerEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayerInformationEffects.html" data-type="entity-link">LayerInformationEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SidebarService.html" data-type="entity-link">SidebarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TopicEffects.html" data-type="entity-link">TopicEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UrlBehaviorService.html" data-type="entity-link">UrlBehaviorService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BaseLayerState.html" data-type="entity-link">BaseLayerState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BehaviorHandler.html" data-type="entity-link">BehaviorHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BehaviorState.html" data-type="entity-link">BehaviorState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryState.html" data-type="entity-link">CategoryState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClickFormatter.html" data-type="entity-link">ClickFormatter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmptyValidator.html" data-type="entity-link">EmptyValidator</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Field.html" data-type="entity-link">Field</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayerInformationState.html" data-type="entity-link">LayerInformationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayerPresentationState.html" data-type="entity-link">LayerPresentationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayerState.html" data-type="entity-link">LayerState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MapClickState.html" data-type="entity-link">MapClickState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MapState.html" data-type="entity-link">MapState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PopupState.html" data-type="entity-link">PopupState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PopupStatus.html" data-type="entity-link">PopupStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Possibility.html" data-type="entity-link">Possibility</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PropertyLocator.html" data-type="entity-link">PropertyLocator</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StoreState.html" data-type="entity-link">StoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TopicState.html" data-type="entity-link">TopicState</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#pipes-links"' :
                                'data-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/KeepHtmlPipe.html" data-type="entity-link">KeepHtmlPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});