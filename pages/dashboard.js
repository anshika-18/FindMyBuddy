export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="container container-das ">
        <div className="row">
          <div className="col-2 das-1">
            <div>FIND MY BUDDY</div>
            <button type="button" class="btn btn-outline-primary btn-side">
              Home
            </button>
            <button type="button" class="btn btn-outline-primary btn-side">
              Home
            </button>
            <button type="button" class="btn btn-primary btn-side">
              Home
            </button>
            <button type="button" class="btn btn-primary btn-side">
              Home
            </button>
            <button type="button" class="btn btn-outline-danger btn-bottom">
              LOGOUT
            </button>
          </div>
          <div className="col-5 das-2">
            <div>MY FAVOURITES</div>
            <div className="container container-fav">
              <div className="row fav-row-head">
                <div className="col-2">#</div>
                <div className="col-6">Title</div>
                <div className="col-4">Artist</div>
              </div>
              <div className="my-fav-div">
                <div className="row fav-row-main">
                  <div className="col-2">1.</div>
                  <div className="col-6">Title</div>
                  <div className="col-4">Artist</div>
                </div>
                <div className="row fav-row-main">
                  <div className="col-2">1.</div>
                  <div className="col-6">Title</div>
                  <div className="col-4">Artist</div>
                </div>
                <div className="row fav-row-main">
                  <div className="col-2">1.</div>
                  <div className="col-6">Title</div>
                  <div className="col-4">Artist</div>
                </div>
                <div className="row fav-row-main">
                  <div className="col-2">1.</div>
                  <div className="col-6">Title</div>
                  <div className="col-4">Artist</div>
                </div>
                <div className="row fav-row-main">
                  <div className="col-2">1.</div>
                  <div className="col-6">Title</div>
                  <div className="col-4">Artist</div>
                </div>
                <div className="row fav-row-main">
                  <div className="col-2">1.</div>
                  <div className="col-6">Title</div>
                  <div className="col-4">Artist</div>
                </div>
                <div className="row fav-row-main">
                  <div className="col-2">1.</div>
                  <div className="col-6">Title</div>
                  <div className="col-4">Artist</div>
                </div>
                <div className="row fav-row-main">
                  <div className="col-2">1.</div>
                  <div className="col-6">Title</div>
                  <div className="col-4">Artist</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5 das-3">
            <div>CHATS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
