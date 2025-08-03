import React, { useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import { GitHub, Launch, Visibility } from '@mui/icons-material';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import mock08 from '../assets/images/mock08.png';
import mock09 from '../assets/images/mock09.png';
import mock10 from '../assets/images/mock10.png';
import '../assets/styles/Project.scss';

interface ProjectData {
    id: number;
    title: string;
    description: string;
    image: string;
    liveUrl: string;
    githubUrl?: string;
    technologies: string[];
    category: string;
}

const projectsData: ProjectData[] = [
    {
        id: 1,
        title: "LegalChamps",
        description: "LegalChamps - a gamified platform for children to learn about their legal rights with real information and advised from an advocate using Claude sonnet-3.5,React, and Firebase",
        image: mock10,
        liveUrl: "https://legalchampsss.vercel.app/",
        technologies: ["React", "NodeJs", "Claude sonnet-3.5", "Firebase"],
        category: "Web Development"
    },
    {
        id: 2,
        title: "Yappin",
        description: "Yappin is a free chat platform that lets users interact with multiple language models through a clean and minimalistic interface. It supports real-time conversations, easy model switching, and delivers a smooth experience across devices.",
        image: mock09,
        liveUrl: "https://yappin-free.vercel.app/",
        technologies: ["ReactJs", "NodeJs", "Firebase", "Socket.io", "HTML", "CSS3"],
        category: "Web Development"
    },
    {
        id: 3,
        title: "High Low Hustle",
        description: "Guess if the next number is higher or lower. Build your streak and beat your best score. Fast, simple, and addictive!",
        image: mock08,
        liveUrl: "https://high-low-hustle.vercel.app/",
        technologies: ["Typescript", "NextJs", "2D Game Development", "ReactJs", "TailwindCSS"],
        category: "Game Development"
    },
    {
        id: 4,
        title: "RecordHive",
        description: "A lightweight web-based screen recording application built with Flask, OpenCV, and MSS. This project allows users to record their screen, save recordings, and download them via a simple web interface.",
        image: mock07,
        liveUrl: "https://github.com/Raaaghavagrawal/RecordHive",
        technologies: ["HTML", "JavaScript", "Python", "Flask", "OpenCV", "MSS"],
        category: "Python Application"
    },
    {
        id: 5,
        title: "Countryle",
        description: "Countryle is a Wordle-inspired geography game where players guess the name of a country using hints like continent, population, and map outline. Built with HTML5, Tailwind CSS, and JavaScript, the game is fully responsive and optimized for both desktop and mobile.",
        image: mock06,
        liveUrl: "https://raaaghavagrawal.github.io/Countryle-game/",
        technologies: ["HTML5", "JavaScript", "Tailwind CSS", "API"],
        category: "Game Development"
    }
];

function Project() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'AI/ML': '#FF6B6B',
            'Game Development': '#4ECDC4',
            'Web Development': '#45B7D1',
            'Data Science': '#96CEB4',
            'Data Analysis': '#FFEAA7',
            'Mobile Development': '#DDA0DD'
        };
        return colors[category] || '#6C5CE7';
    };

    return (
        <div className="projects-container" id="projects">
            <Box className="projects-header">
                <Typography variant="h2" className="projects-title" sx={{ color: 'white' }}>
                    Personal Projects
                </Typography>
                <Typography variant="body1" className="projects-subtitle">
                    A collection of my work showcasing various technologies and domains
                </Typography>
            </Box>
            
            <div className="projects-grid">
                {projectsData.map((project) => (
                    <Card 
                        key={project.id}
                        className="project-card"
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                            }
                        }}
                    >
                        <Box className="project-image-container">
                            <CardMedia
                                component="img"
                                height="200"
                                image={project.image}
                                alt={project.title}
                                className="project-image"
                                sx={{
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                    transform: hoveredProject === project.id ? 'scale(1.05)' : 'scale(1)',
                                }}
                            />
                            <Box className="project-overlay">
                                <Box className="project-actions">
                                    <Tooltip title="View Live">
                                        <IconButton 
                                            component="a" 
                                            href={project.liveUrl} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="project-action-btn"
                                        >
                                            <Launch />
                                        </IconButton>
                                    </Tooltip>
                                    {project.githubUrl && (
                                        <Tooltip title="View Code">
                                            <IconButton 
                                                component="a" 
                                                href={project.githubUrl} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="project-action-btn"
                                            >
                                                <GitHub />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        
                        <CardContent className="project-content" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Box className="project-header">
                                <Chip 
                                    label={project.category}
                                    size="small"
                                    sx={{
                                        backgroundColor: getCategoryColor(project.category),
                                        color: 'white',
                                        fontWeight: 600,
                                        mb: 1
                                    }}
                                />
                                <Typography variant="h5" className="project-title" component="h3">
                                    {project.title}
                                </Typography>
                            </Box>
                            
                            <Typography variant="body2" className="project-description" sx={{ mb: 2, flexGrow: 1 }}>
                                {project.description}
                            </Typography>
                            
                            <Box className="project-technologies">
                                {project.technologies.map((tech, index) => (
                                    <Chip
                                        key={index}
                                        label={tech}
                                        size="small"
                                        variant="outlined"
                                        className="tech-chip"
                                        sx={{
                                            mr: 0.5,
                                            mb: 0.5,
                                            fontSize: '0.75rem',
                                            borderColor: 'rgba(255,255,255,0.3)',
                                            color: 'rgba(255,255,255,0.8)',
                                            '&:hover': {
                                                borderColor: '#64b5f6',
                                                color: '#64b5f6',
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Project;