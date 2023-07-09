import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";

const ShowCard = ({show: {titleText: {text}, plot: {plotText},primaryImage: {url, caption}}}) => {
    return (
        <Card
            sx={{width: {md: '320px', sm: '550px', xs: '300px'}, boxShadow: 'none', borderRadius: 0}}
        >
            <Link
                to=''
            >
                <CardMedia
                    image={url}
                    alt={caption.plainText}
                    sx={{width: {md: '320px', sm: '550px', xs: '300px'}, height: 180}}
                />
            </Link>
            <CardContent
                sx={{backgroundColor: '#1e1e1e', height: '106px'}}
            >
                <Link
                    to=''
                >
                    <Typography
                        fontWeight="bold"
                        color="#FFFFFF"
                    >
                        {text}
                    </Typography>
                </Link>
                <Typography
                    fontWeight="light"
                    color="#FFFFFF"
                >
                    {plotText.plainText}
                </Typography>
            </CardContent>
        </Card>
  )
}

export default ShowCard