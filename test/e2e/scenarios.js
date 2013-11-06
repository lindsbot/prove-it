describe('quiz app', function(){

  beforeEach(function(){
    browser().navigateTo('../../views/index.html');
  });

  it('should load header', function(){
    browser().navigateTo('/quiz');
    expect(browser().location().url()).toBe('/quiz');
    expect(element('h2').text().toMatch('Take this AngularJS quiz to prove it'));
  });

  it('should load first question', function(){
    browser().navigateTo('/quiz');
    expect(element('.question').text().toMatch('Which is not an advantage of using a closure?'));
  });

  it('should select an answer option', function(){
    browser().navigateTo('/quiz');
    input('$parent.question.selected').select('Prevent pollution of global scope');
    expect(binding('$parent.question.selected')).toEqual('Prevent pollution of global scope');
  });


  
});