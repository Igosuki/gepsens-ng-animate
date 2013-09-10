'use strict'

describe 'Directive: stop', () ->
  beforeEach module 'meanApp'

  element = {}

  it 'should make hidden element visible', inject ($rootScope, $compile) ->
    element = angular.element '<stop></stop>'
    element = $compile(element) $rootScope
    expect(element.text()).toBe 'this is the stop directive'
