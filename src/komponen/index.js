const AlbumImage = ({src,children}) =>(
    <div>
        <img src={src} width="300" height="300" className="rotate"/>
        {children}
    </div>
);

const AlbumDesc = (props) => <h2>Album:{props.name}</h2>;

const AlbumName = ({name, artist, children}) => (
    <div classname="albumName">
        <p>{name}</p>
        <p>{artist}</p>
        {children}
    </div>
);

const ButtonUrl = (url) => <button><a href={url}>Select</a></button>;

export {AlbumImage, AlbumDesc, AlbumName, ButtonUrl};