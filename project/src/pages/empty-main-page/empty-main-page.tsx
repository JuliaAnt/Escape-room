import Logo from '../../components/logo/logo';

function EmptyMainPage(): JSX.Element {
  return (
    <>
      <Logo currentPage={null} />
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x" />
            <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt="" />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            <form className="login-form" action="" method="post">
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title" style={{ marginTop: '50%' }}>We could not find any property available at the moment</h1>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default EmptyMainPage;

