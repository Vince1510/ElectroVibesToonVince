import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, Grid, Button } from "@mui/material";

function Monitor() {
  // Sample monitor data
  const monitors = [
    {
      id: 1,
      name: "Gaming Monitor",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.",
    },
    {
      id: 2,
      name: "4K Monitor",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.",
    },
    {
      id: 3,
      name: "Curved Monitor",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.",
    },
    {
      id: 4,
      name: "Portable Monitor",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.",
    },
    // Add more monitors as needed
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Monitor Page
      </Typography>
      <Typography gutterBottom>This is the Monitor page content.</Typography>
      <Grid container spacing={2}>
        {monitors.map((monitor) => (
          <Grid item xs={12} sm={6} md={4} key={monitor.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{monitor.name}</Typography>
                <Typography>{monitor.description}</Typography>
                <Link to={`/monitor/${monitor.id}`}>
                  <Button variant="contained" color="primary">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Monitor;
