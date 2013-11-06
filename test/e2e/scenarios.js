describe('quiz app', function(){

  it('should load the index', function(){
    browser().navigateTo('../../views/index.html');
    expect(browser().location().url()).toBe('/');
  });

  it('should load header', function(){
    browser().navigateTo('/quiz');
    expect(element('h2').text().toMatch('Take this AngularJS quiz to prove it'));
  });

  it('should load first question', function(){
    browser().navigateTo('/quiz');
    expect(element('.question').text().toMatch('Which is not an advantage of using a closure?'));
  });
  
});